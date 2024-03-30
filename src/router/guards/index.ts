import { Router } from 'vue-router'
import setupPermissionGuard from './permission'
import { setRouteEmitter } from '@/mitt/route-listener'

function setupPageGuard(router: Router) {
  router.beforeEach(to => setRouteEmitter(to))
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router)
  setupPermissionGuard(router)
}
