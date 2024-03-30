<template>
  <a-upload
    v-bind="bindAttrs"
    :before-upload="handleBeforeUpload"
    @change="handleChange"
    @preview="handlePreview"
  >
    <slot>
      <div v-if="!slots.default && filePaths.length < maxNum && files?.length < maxNum">
        <template v-if="props.acceptType === 'img'">
          <upload-outlined />
          <div class="ant-upload-text">
            上传
          </div>
        </template>
        <template v-else>
          <a-button
            :type="props.buttonType"
            :ghost="props.ghost"
          >
            <upload-outlined /> 上传
          </a-button>
        </template>
      </div>
    </slot>
  </a-upload>
  <div
    v-if="props.remindInfo"
    class="text-gray-200"
  >
    {{ props.remindInfo }}
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRaw, unref, useAttrs, useSlots } from 'vue'
import { useMessage } from '@/hooks/message'
import { UploadOutlined } from '@ant-design/icons-vue'
import { useEnv } from '@/hooks/env'
import { useUserStore } from '@/store'
import { previewFromUrl } from '@/utils/file'
import { pick, omit } from 'lodash-es'
import type { UploadFile, UploadProps } from 'ant-design-vue'
import { uploadProps } from './props'
import { getFileName } from '@/utils/qs'
import imageCompression from 'browser-image-compression'

const attrs = useAttrs()
const slots = useSlots()
type EmitEvents = {
  (e: 'update:value', filePaths: Array<string>):void
}
const emits = defineEmits<EmitEvents>()
const props = defineProps(uploadProps)


// 文件路径数组
const filePaths = ref<string[]>([])


// upload 组件值，设置该值，使得 upload 组件为受控组件。上传的状态及图片的显示，由 files 控制
const files = ref<UploadProps['fileList']>([])
onMounted(() => {
  props.value.forEach(fileUrl => {
    const fileName = getFileName(fileUrl)
    files.value?.push({
      uid: fileName,
      name: fileName,
      status: 'done',
      url: fileUrl,
    })
  })
  console.log(slots, props.maxNum, filePaths.value, files.value?.length, 'slot')
})

// 允许上传的文件类型
const getAccept = computed(() => {
  if (props.accept.length) {
    return props.accept
  }
  if (props.acceptType === 'img') {
    return ['jpg', 'jpeg', 'png']
  }
  if (props.acceptType === 'zip') {
    return ['zip']
  }
  if (props.acceptType === 'doc') {
    return ['doc', 'docx']
  }
  return ['xls', 'xlsx', 'pdf']
})

// 获取上传接口调用的请求头
const getHeaders = computed(() => ({
  ...pick(attrs, 'headers'),
  Authorization: `Bearer ${useUserStore().token}`,
}))

const getParams = computed(() => ({
  ...pick(attrs, 'data'),
  type: props.acceptType,
}))

const bindAttrs = computed(() => ({
  fileList: unref(files),
  action: useEnv.uploadApiUrl,
  headers: unref(getHeaders),
  data: unref(getParams),
  accept: unref(getAccept)
    .map(i => (i.startsWith('.') ? i : `.${i}`))
    .join(','),
  ...(props.acceptType === 'img' ? { 'list-type': 'picture-card' } : {}),
  ...omit(attrs, ['headers', 'data']),
}))

// 上传前拦截
async function handleBeforeUpload(file: File) {
  const { size, name } = file
  const { maxSize, maxNum } = props

  if (maxSize && maxSize * 1024 * 1024 < size) {
    useMessage.error(`只能上传不超过${maxSize}M的文件`)
    return false
  }

  console.log(maxNum, filePaths.value)
  if (maxNum && maxNum <= filePaths.value.length) {
    useMessage.error(`最多上传${maxNum}个文件`)
    return false
  }

  const accept = unref(getAccept)
  if (accept.length > 0 && !new RegExp(`\\.(${accept.join('|')})$`, 'i').test(name)) {
    useMessage.error(`只能上传${accept.join(',')}格式的文件`)
    return false
  }
  if (props.acceptType === 'img') {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.6
    }
    const compressedFile = await imageCompression(file, options)
    return Promise.resolve(compressedFile)
  }
  return true
}

// 上传完成，数据整理
function handleChange({ file, fileList }: { file: UploadFile, fileList: UploadFile[] }) {
  if (file.size > props?.maxSize * 1024 * 1024) {
    return
  }
  files.value = fileList // 设置为受控组件，需要将 uploading 状态的 file 同步到 files 中，使的上传功能继续执行，才能触发 done 等上传结束事件
  if (file.status !== 'done' && file.status !== 'removed') {
    return
  }

  filePaths.value = toRaw(fileList)
    .filter(f => f.status === 'done')
    .map(f => {
      if (f.response) { // 新上传的文件
        return f.response.data.path
      } else { // 数据回填的文件
        return new URL(f.url!).pathname
      }
    })
  emits('update:value', filePaths.value)
}

// 预览功能，解决 ant-design 默认新开页面，打开 base64 数据造成的 chrome 安全警告问题，Not allowed to navigate top frame to data URL:
function handlePreview(file: UploadFile) {
  if (file.response) { // 新上传的文件
    previewFromUrl(file.response.data.url)
  } else { // 数据回填的文件
    previewFromUrl(file.url!)
  }
}
</script>
