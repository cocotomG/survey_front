/* eslint-disable max-lines */


const province = [
  {
    id: 110000,
    name: '北京市',
    pid: 0,
    level: 1
  },
  {
    id: 120000,
    name: '天津市',
    pid: 0,
    level: 1
  },
  {
    id: 130000,
    name: '河北省',
    pid: 0,
    level: 1
  },
  {
    id: 140000,
    name: '山西省',
    pid: 0,
    level: 1
  },
  {
    id: 150000,
    name: '内蒙古自治区',
    pid: 0,
    level: 1
  },
  {
    id: 210000,
    name: '辽宁省',
    pid: 0,
    level: 1
  },
  {
    id: 220000,
    name: '吉林省',
    pid: 0,
    level: 1
  },
  {
    id: 230000,
    name: '黑龙江省',
    pid: 0,
    level: 1
  },
  {
    id: 310000,
    name: '上海市',
    pid: 0,
    level: 1
  },
  {
    id: 320000,
    name: '江苏省',
    pid: 0,
    level: 1
  },
  {
    id: 330000,
    name: '浙江省',
    pid: 0,
    level: 1
  },
  {
    id: 340000,
    name: '安徽省',
    pid: 0,
    level: 1
  },
  {
    id: 350000,
    name: '福建省',
    pid: 0,
    level: 1
  },
  {
    id: 360000,
    name: '江西省',
    pid: 0,
    level: 1
  },
  {
    id: 370000,
    name: '山东省',
    pid: 0,
    level: 1
  },
  {
    id: 410000,
    name: '河南省',
    pid: 0,
    level: 1
  },
  {
    id: 420000,
    name: '湖北省',
    pid: 0,
    level: 1
  },
  {
    id: 430000,
    name: '湖南省',
    pid: 0,
    level: 1
  },
  {
    id: 440000,
    name: '广东省',
    pid: 0,
    level: 1
  },
  {
    id: 450000,
    name: '广西壮族自治区',
    pid: 0,
    level: 1
  },
  {
    id: 460000,
    name: '海南省',
    pid: 0,
    level: 1
  },
  {
    id: 500000,
    name: '重庆市',
    pid: 0,
    level: 1
  },
  {
    id: 510000,
    name: '四川省',
    pid: 0,
    level: 1
  },
  {
    id: 520000,
    name: '贵州省',
    pid: 0,
    level: 1
  },
  {
    id: 530000,
    name: '云南省',
    pid: 0,
    level: 1
  },
  {
    id: 540000,
    name: '西藏自治区',
    pid: 0,
    level: 1
  },
  {
    id: 610000,
    name: '陕西省',
    pid: 0,
    level: 1
  },
  {
    id: 620000,
    name: '甘肃省',
    pid: 0,
    level: 1
  },
  {
    id: 630000,
    name: '青海省',
    pid: 0,
    level: 1
  },
  {
    id: 640000,
    name: '宁夏回族自治区',
    pid: 0,
    level: 1
  },
  {
    id: 650000,
    name: '新疆维吾尔自治区',
    pid: 0,
    level: 1
  },
]

const city = {
  110000: [
    {
      id: 110100,
      name: '北京市',
      pid: 110000,
      level: 2
    }
  ],
  120000: [
    {
      id: 120100,
      name: '天津市',
      pid: 120000,
      level: 2
    }
  ],
  130000: [
    {
      id: 130100,
      name: '石家庄市',
      pid: 130000,
      level: 2
    },
    {
      id: 130200,
      name: '唐山市',
      pid: 130000,
      level: 2
    },
    {
      id: 130300,
      name: '秦皇岛市',
      pid: 130000,
      level: 2
    },
    {
      id: 130400,
      name: '邯郸市',
      pid: 130000,
      level: 2
    },
    {
      id: 130500,
      name: '邢台市',
      pid: 130000,
      level: 2
    },
    {
      id: 130600,
      name: '保定市',
      pid: 130000,
      level: 2
    },
    {
      id: 130700,
      name: '张家口市',
      pid: 130000,
      level: 2
    },
    {
      id: 130800,
      name: '承德市',
      pid: 130000,
      level: 2
    },
    {
      id: 130900,
      name: '沧州市',
      pid: 130000,
      level: 2
    },
    {
      id: 131000,
      name: '廊坊市',
      pid: 130000,
      level: 2
    },
    {
      id: 131100,
      name: '衡水市',
      pid: 130000,
      level: 2
    }
  ],
  140000: [
    {
      id: 140100,
      name: '太原市',
      pid: 140000,
      level: 2
    },
    {
      id: 140200,
      name: '大同市',
      pid: 140000,
      level: 2
    },
    {
      id: 140300,
      name: '阳泉市',
      pid: 140000,
      level: 2
    },
    {
      id: 140400,
      name: '长治市',
      pid: 140000,
      level: 2
    },
    {
      id: 140500,
      name: '晋城市',
      pid: 140000,
      level: 2
    },
    {
      id: 140600,
      name: '朔州市',
      pid: 140000,
      level: 2
    },
    {
      id: 140700,
      name: '晋中市',
      pid: 140000,
      level: 2
    },
    {
      id: 140800,
      name: '运城市',
      pid: 140000,
      level: 2
    },
    {
      id: 140900,
      name: '忻州市',
      pid: 140000,
      level: 2
    },
    {
      id: 141000,
      name: '临汾市',
      pid: 140000,
      level: 2
    },
    {
      id: 141100,
      name: '吕梁市',
      pid: 140000,
      level: 2
    }
  ],
  150000: [
    {
      id: 150100,
      name: '呼和浩特市',
      pid: 150000,
      level: 2
    },
    {
      id: 150200,
      name: '包头市',
      pid: 150000,
      level: 2
    },
    {
      id: 150300,
      name: '乌海市',
      pid: 150000,
      level: 2
    },
    {
      id: 150400,
      name: '赤峰市',
      pid: 150000,
      level: 2
    },
    {
      id: 150500,
      name: '通辽市',
      pid: 150000,
      level: 2
    },
    {
      id: 150600,
      name: '鄂尔多斯市',
      pid: 150000,
      level: 2
    },
    {
      id: 150700,
      name: '呼伦贝尔市',
      pid: 150000,
      level: 2
    },
    {
      id: 150800,
      name: '巴彦淖尔市',
      pid: 150000,
      level: 2
    },
    {
      id: 150900,
      name: '乌兰察布市',
      pid: 150000,
      level: 2
    },
    {
      id: 152200,
      name: '兴安盟',
      pid: 150000,
      level: 2
    },
    {
      id: 152500,
      name: '锡林郭勒盟',
      pid: 150000,
      level: 2
    },
    {
      id: 152900,
      name: '阿拉善盟',
      pid: 150000,
      level: 2
    }
  ],
  210000: [
    {
      id: 210100,
      name: '沈阳市',
      pid: 210000,
      level: 2
    },
    {
      id: 210200,
      name: '大连市',
      pid: 210000,
      level: 2
    },
    {
      id: 210300,
      name: '鞍山市',
      pid: 210000,
      level: 2
    },
    {
      id: 210400,
      name: '抚顺市',
      pid: 210000,
      level: 2
    },
    {
      id: 210500,
      name: '本溪市',
      pid: 210000,
      level: 2
    },
    {
      id: 210600,
      name: '丹东市',
      pid: 210000,
      level: 2
    },
    {
      id: 210700,
      name: '锦州市',
      pid: 210000,
      level: 2
    },
    {
      id: 210800,
      name: '营口市',
      pid: 210000,
      level: 2
    },
    {
      id: 210900,
      name: '阜新市',
      pid: 210000,
      level: 2
    },
    {
      id: 211000,
      name: '辽阳市',
      pid: 210000,
      level: 2
    },
    {
      id: 211100,
      name: '盘锦市',
      pid: 210000,
      level: 2
    },
    {
      id: 211200,
      name: '铁岭市',
      pid: 210000,
      level: 2
    },
    {
      id: 211300,
      name: '朝阳市',
      pid: 210000,
      level: 2
    },
    {
      id: 211400,
      name: '葫芦岛市',
      pid: 210000,
      level: 2
    }
  ],
  220000: [
    {
      id: 220100,
      name: '长春市',
      pid: 220000,
      level: 2
    },
    {
      id: 220200,
      name: '吉林市',
      pid: 220000,
      level: 2
    },
    {
      id: 220300,
      name: '四平市',
      pid: 220000,
      level: 2
    },
    {
      id: 220400,
      name: '辽源市',
      pid: 220000,
      level: 2
    },
    {
      id: 220500,
      name: '通化市',
      pid: 220000,
      level: 2
    },
    {
      id: 220600,
      name: '白山市',
      pid: 220000,
      level: 2
    },
    {
      id: 220700,
      name: '松原市',
      pid: 220000,
      level: 2
    },
    {
      id: 220800,
      name: '白城市',
      pid: 220000,
      level: 2
    },
    {
      id: 222400,
      name: '延边朝鲜族自治州',
      pid: 220000,
      level: 2
    }
  ],
  230000: [
    {
      id: 230100,
      name: '哈尔滨市',
      pid: 230000,
      level: 2
    },
    {
      id: 230200,
      name: '齐齐哈尔市',
      pid: 230000,
      level: 2
    },
    {
      id: 230300,
      name: '鸡西市',
      pid: 230000,
      level: 2
    },
    {
      id: 230400,
      name: '鹤岗市',
      pid: 230000,
      level: 2
    },
    {
      id: 230500,
      name: '双鸭山市',
      pid: 230000,
      level: 2
    },
    {
      id: 230600,
      name: '大庆市',
      pid: 230000,
      level: 2
    },
    {
      id: 230700,
      name: '伊春市',
      pid: 230000,
      level: 2
    },
    {
      id: 230800,
      name: '佳木斯市',
      pid: 230000,
      level: 2
    },
    {
      id: 230900,
      name: '七台河市',
      pid: 230000,
      level: 2
    },
    {
      id: 231000,
      name: '牡丹江市',
      pid: 230000,
      level: 2
    },
    {
      id: 231100,
      name: '黑河市',
      pid: 230000,
      level: 2
    },
    {
      id: 231200,
      name: '绥化市',
      pid: 230000,
      level: 2
    },
    {
      id: 232700,
      name: '大兴安岭地区',
      pid: 230000,
      level: 2
    }
  ],
  310000: [
    {
      id: 310100,
      name: '上海市',
      pid: 310000,
      level: 2
    }
  ],
  320000: [
    {
      id: 320100,
      name: '南京市',
      pid: 320000,
      level: 2
    },
    {
      id: 320200,
      name: '无锡市',
      pid: 320000,
      level: 2
    },
    {
      id: 320300,
      name: '徐州市',
      pid: 320000,
      level: 2
    },
    {
      id: 320400,
      name: '常州市',
      pid: 320000,
      level: 2
    },
    {
      id: 320500,
      name: '苏州市',
      pid: 320000,
      level: 2
    },
    {
      id: 320600,
      name: '南通市',
      pid: 320000,
      level: 2
    },
    {
      id: 320700,
      name: '连云港市',
      pid: 320000,
      level: 2
    },
    {
      id: 320800,
      name: '淮安市',
      pid: 320000,
      level: 2
    },
    {
      id: 320900,
      name: '盐城市',
      pid: 320000,
      level: 2
    },
    {
      id: 321000,
      name: '扬州市',
      pid: 320000,
      level: 2
    },
    {
      id: 321100,
      name: '镇江市',
      pid: 320000,
      level: 2
    },
    {
      id: 321200,
      name: '泰州市',
      pid: 320000,
      level: 2
    },
    {
      id: 321300,
      name: '宿迁市',
      pid: 320000,
      level: 2
    }
  ],
  330000: [
    {
      id: 330100,
      name: '杭州市',
      pid: 330000,
      level: 2
    },
    {
      id: 330200,
      name: '宁波市',
      pid: 330000,
      level: 2
    },
    {
      id: 330300,
      name: '温州市',
      pid: 330000,
      level: 2
    },
    {
      id: 330400,
      name: '嘉兴市',
      pid: 330000,
      level: 2
    },
    {
      id: 330500,
      name: '湖州市',
      pid: 330000,
      level: 2
    },
    {
      id: 330600,
      name: '绍兴市',
      pid: 330000,
      level: 2
    },
    {
      id: 330700,
      name: '金华市',
      pid: 330000,
      level: 2
    },
    {
      id: 330800,
      name: '衢州市',
      pid: 330000,
      level: 2
    },
    {
      id: 330900,
      name: '舟山市',
      pid: 330000,
      level: 2
    },
    {
      id: 331000,
      name: '台州市',
      pid: 330000,
      level: 2
    },
    {
      id: 331100,
      name: '丽水市',
      pid: 330000,
      level: 2
    }
  ],
  340000: [
    {
      id: 340100,
      name: '合肥市',
      pid: 340000,
      level: 2
    },
    {
      id: 340200,
      name: '芜湖市',
      pid: 340000,
      level: 2
    },
    {
      id: 340300,
      name: '蚌埠市',
      pid: 340000,
      level: 2
    },
    {
      id: 340400,
      name: '淮南市',
      pid: 340000,
      level: 2
    },
    {
      id: 340500,
      name: '马鞍山市',
      pid: 340000,
      level: 2
    },
    {
      id: 340600,
      name: '淮北市',
      pid: 340000,
      level: 2
    },
    {
      id: 340700,
      name: '铜陵市',
      pid: 340000,
      level: 2
    },
    {
      id: 340800,
      name: '安庆市',
      pid: 340000,
      level: 2
    },
    {
      id: 341000,
      name: '黄山市',
      pid: 340000,
      level: 2
    },
    {
      id: 341100,
      name: '滁州市',
      pid: 340000,
      level: 2
    },
    {
      id: 341200,
      name: '阜阳市',
      pid: 340000,
      level: 2
    },
    {
      id: 341300,
      name: '宿州市',
      pid: 340000,
      level: 2
    },
    {
      id: 341500,
      name: '六安市',
      pid: 340000,
      level: 2
    },
    {
      id: 341600,
      name: '亳州市',
      pid: 340000,
      level: 2
    },
    {
      id: 341700,
      name: '池州市',
      pid: 340000,
      level: 2
    },
    {
      id: 341800,
      name: '宣城市',
      pid: 340000,
      level: 2
    }
  ],
  350000: [
    {
      id: 350100,
      name: '福州市',
      pid: 350000,
      level: 2
    },
    {
      id: 350200,
      name: '厦门市',
      pid: 350000,
      level: 2
    },
    {
      id: 350300,
      name: '莆田市',
      pid: 350000,
      level: 2
    },
    {
      id: 350400,
      name: '三明市',
      pid: 350000,
      level: 2
    },
    {
      id: 350500,
      name: '泉州市',
      pid: 350000,
      level: 2
    },
    {
      id: 350600,
      name: '漳州市',
      pid: 350000,
      level: 2
    },
    {
      id: 350700,
      name: '南平市',
      pid: 350000,
      level: 2
    },
    {
      id: 350800,
      name: '龙岩市',
      pid: 350000,
      level: 2
    },
    {
      id: 350900,
      name: '宁德市',
      pid: 350000,
      level: 2
    }
  ],
  360000: [
    {
      id: 360100,
      name: '南昌市',
      pid: 360000,
      level: 2
    },
    {
      id: 360200,
      name: '景德镇市',
      pid: 360000,
      level: 2
    },
    {
      id: 360300,
      name: '萍乡市',
      pid: 360000,
      level: 2
    },
    {
      id: 360400,
      name: '九江市',
      pid: 360000,
      level: 2
    },
    {
      id: 360500,
      name: '新余市',
      pid: 360000,
      level: 2
    },
    {
      id: 360600,
      name: '鹰潭市',
      pid: 360000,
      level: 2
    },
    {
      id: 360700,
      name: '赣州市',
      pid: 360000,
      level: 2
    },
    {
      id: 360800,
      name: '吉安市',
      pid: 360000,
      level: 2
    },
    {
      id: 360900,
      name: '宜春市',
      pid: 360000,
      level: 2
    },
    {
      id: 361000,
      name: '抚州市',
      pid: 360000,
      level: 2
    },
    {
      id: 361100,
      name: '上饶市',
      pid: 360000,
      level: 2
    }
  ],
  370000: [
    {
      id: 370100,
      name: '济南市',
      pid: 370000,
      level: 2
    },
    {
      id: 370200,
      name: '青岛市',
      pid: 370000,
      level: 2
    },
    {
      id: 370300,
      name: '淄博市',
      pid: 370000,
      level: 2
    },
    {
      id: 370400,
      name: '枣庄市',
      pid: 370000,
      level: 2
    },
    {
      id: 370500,
      name: '东营市',
      pid: 370000,
      level: 2
    },
    {
      id: 370600,
      name: '烟台市',
      pid: 370000,
      level: 2
    },
    {
      id: 370700,
      name: '潍坊市',
      pid: 370000,
      level: 2
    },
    {
      id: 370800,
      name: '济宁市',
      pid: 370000,
      level: 2
    },
    {
      id: 370900,
      name: '泰安市',
      pid: 370000,
      level: 2
    },
    {
      id: 371000,
      name: '威海市',
      pid: 370000,
      level: 2
    },
    {
      id: 371100,
      name: '日照市',
      pid: 370000,
      level: 2
    },
    {
      id: 371300,
      name: '临沂市',
      pid: 370000,
      level: 2
    },
    {
      id: 371400,
      name: '德州市',
      pid: 370000,
      level: 2
    },
    {
      id: 371500,
      name: '聊城市',
      pid: 370000,
      level: 2
    },
    {
      id: 371600,
      name: '滨州市',
      pid: 370000,
      level: 2
    },
    {
      id: 371700,
      name: '菏泽市',
      pid: 370000,
      level: 2
    }
  ],
  410000: [
    {
      id: 410100,
      name: '郑州市',
      pid: 410000,
      level: 2
    },
    {
      id: 410200,
      name: '开封市',
      pid: 410000,
      level: 2
    },
    {
      id: 410300,
      name: '洛阳市',
      pid: 410000,
      level: 2
    },
    {
      id: 410400,
      name: '平顶山市',
      pid: 410000,
      level: 2
    },
    {
      id: 410500,
      name: '安阳市',
      pid: 410000,
      level: 2
    },
    {
      id: 410600,
      name: '鹤壁市',
      pid: 410000,
      level: 2
    },
    {
      id: 410700,
      name: '新乡市',
      pid: 410000,
      level: 2
    },
    {
      id: 410800,
      name: '焦作市',
      pid: 410000,
      level: 2
    },
    {
      id: 410900,
      name: '濮阳市',
      pid: 410000,
      level: 2
    },
    {
      id: 411000,
      name: '许昌市',
      pid: 410000,
      level: 2
    },
    {
      id: 411100,
      name: '漯河市',
      pid: 410000,
      level: 2
    },
    {
      id: 411200,
      name: '三门峡市',
      pid: 410000,
      level: 2
    },
    {
      id: 411300,
      name: '南阳市',
      pid: 410000,
      level: 2
    },
    {
      id: 411400,
      name: '商丘市',
      pid: 410000,
      level: 2
    },
    {
      id: 411500,
      name: '信阳市',
      pid: 410000,
      level: 2
    },
    {
      id: 411600,
      name: '周口市',
      pid: 410000,
      level: 2
    },
    {
      id: 411700,
      name: '驻马店市',
      pid: 410000,
      level: 2
    },
    {
      id: 419000,
      name: '省直辖县级行政区划',
      pid: 410000,
      level: 2
    }
  ],
  420000: [
    {
      id: 420100,
      name: '武汉市',
      pid: 420000,
      level: 2
    },
    {
      id: 420200,
      name: '黄石市',
      pid: 420000,
      level: 2
    },
    {
      id: 420300,
      name: '十堰市',
      pid: 420000,
      level: 2
    },
    {
      id: 420500,
      name: '宜昌市',
      pid: 420000,
      level: 2
    },
    {
      id: 420600,
      name: '襄阳市',
      pid: 420000,
      level: 2
    },
    {
      id: 420700,
      name: '鄂州市',
      pid: 420000,
      level: 2
    },
    {
      id: 420800,
      name: '荆门市',
      pid: 420000,
      level: 2
    },
    {
      id: 420900,
      name: '孝感市',
      pid: 420000,
      level: 2
    },
    {
      id: 421000,
      name: '荆州市',
      pid: 420000,
      level: 2
    },
    {
      id: 421100,
      name: '黄冈市',
      pid: 420000,
      level: 2
    },
    {
      id: 421200,
      name: '咸宁市',
      pid: 420000,
      level: 2
    },
    {
      id: 421300,
      name: '随州市',
      pid: 420000,
      level: 2
    },
    {
      id: 422800,
      name: '恩施土家族苗族自治州',
      pid: 420000,
      level: 2
    },
    {
      id: 429000,
      name: '省直辖县级行政区划',
      pid: 420000,
      level: 2
    }
  ],
  430000: [
    {
      id: 430100,
      name: '长沙市',
      pid: 430000,
      level: 2
    },
    {
      id: 430200,
      name: '株洲市',
      pid: 430000,
      level: 2
    },
    {
      id: 430300,
      name: '湘潭市',
      pid: 430000,
      level: 2
    },
    {
      id: 430400,
      name: '衡阳市',
      pid: 430000,
      level: 2
    },
    {
      id: 430500,
      name: '邵阳市',
      pid: 430000,
      level: 2
    },
    {
      id: 430600,
      name: '岳阳市',
      pid: 430000,
      level: 2
    },
    {
      id: 430700,
      name: '常德市',
      pid: 430000,
      level: 2
    },
    {
      id: 430800,
      name: '张家界市',
      pid: 430000,
      level: 2
    },
    {
      id: 430900,
      name: '益阳市',
      pid: 430000,
      level: 2
    },
    {
      id: 431000,
      name: '郴州市',
      pid: 430000,
      level: 2
    },
    {
      id: 431100,
      name: '永州市',
      pid: 430000,
      level: 2
    },
    {
      id: 431200,
      name: '怀化市',
      pid: 430000,
      level: 2
    },
    {
      id: 431300,
      name: '娄底市',
      pid: 430000,
      level: 2
    },
    {
      id: 433100,
      name: '湘西土家族苗族自治州',
      pid: 430000,
      level: 2
    }
  ],
  440000: [
    {
      id: 440100,
      name: '广州市',
      pid: 440000,
      level: 2
    },
    {
      id: 440200,
      name: '韶关市',
      pid: 440000,
      level: 2
    },
    {
      id: 440300,
      name: '深圳市',
      pid: 440000,
      level: 2
    },
    {
      id: 440400,
      name: '珠海市',
      pid: 440000,
      level: 2
    },
    {
      id: 440500,
      name: '汕头市',
      pid: 440000,
      level: 2
    },
    {
      id: 440600,
      name: '佛山市',
      pid: 440000,
      level: 2
    },
    {
      id: 440700,
      name: '江门市',
      pid: 440000,
      level: 2
    },
    {
      id: 440800,
      name: '湛江市',
      pid: 440000,
      level: 2
    },
    {
      id: 440900,
      name: '茂名市',
      pid: 440000,
      level: 2
    },
    {
      id: 441200,
      name: '肇庆市',
      pid: 440000,
      level: 2
    },
    {
      id: 441300,
      name: '惠州市',
      pid: 440000,
      level: 2
    },
    {
      id: 441400,
      name: '梅州市',
      pid: 440000,
      level: 2
    },
    {
      id: 441500,
      name: '汕尾市',
      pid: 440000,
      level: 2
    },
    {
      id: 441600,
      name: '河源市',
      pid: 440000,
      level: 2
    },
    {
      id: 441700,
      name: '阳江市',
      pid: 440000,
      level: 2
    },
    {
      id: 441800,
      name: '清远市',
      pid: 440000,
      level: 2
    },
    {
      id: 441900,
      name: '东莞市',
      pid: 440000,
      level: 2
    },
    {
      id: 442000,
      name: '中山市',
      pid: 440000,
      level: 2
    },
    {
      id: 445100,
      name: '潮州市',
      pid: 440000,
      level: 2
    },
    {
      id: 445200,
      name: '揭阳市',
      pid: 440000,
      level: 2
    },
    {
      id: 445300,
      name: '云浮市',
      pid: 440000,
      level: 2
    }
  ],
  450000: [
    {
      id: 450100,
      name: '南宁市',
      pid: 450000,
      level: 2
    },
    {
      id: 450200,
      name: '柳州市',
      pid: 450000,
      level: 2
    },
    {
      id: 450300,
      name: '桂林市',
      pid: 450000,
      level: 2
    },
    {
      id: 450400,
      name: '梧州市',
      pid: 450000,
      level: 2
    },
    {
      id: 450500,
      name: '北海市',
      pid: 450000,
      level: 2
    },
    {
      id: 450600,
      name: '防城港市',
      pid: 450000,
      level: 2
    },
    {
      id: 450700,
      name: '钦州市',
      pid: 450000,
      level: 2
    },
    {
      id: 450800,
      name: '贵港市',
      pid: 450000,
      level: 2
    },
    {
      id: 450900,
      name: '玉林市',
      pid: 450000,
      level: 2
    },
    {
      id: 451000,
      name: '百色市',
      pid: 450000,
      level: 2
    },
    {
      id: 451100,
      name: '贺州市',
      pid: 450000,
      level: 2
    },
    {
      id: 451200,
      name: '河池市',
      pid: 450000,
      level: 2
    },
    {
      id: 451300,
      name: '来宾市',
      pid: 450000,
      level: 2
    },
    {
      id: 451400,
      name: '崇左市',
      pid: 450000,
      level: 2
    }
  ],
  460000: [
    {
      id: 460100,
      name: '海口市',
      pid: 460000,
      level: 2
    },
    {
      id: 460200,
      name: '三亚市',
      pid: 460000,
      level: 2
    },
    {
      id: 460300,
      name: '三沙市',
      pid: 460000,
      level: 2
    },
    {
      id: 460400,
      name: '儋州市',
      pid: 460000,
      level: 2
    },
    {
      id: 469000,
      name: '省直辖县级行政区划',
      pid: 460000,
      level: 2
    }
  ],
  500000: [
    {
      id: 500100,
      name: '重庆市',
      pid: 500000,
      level: 2
    },
    {
      id: 500200,
      name: '县',
      pid: 500000,
      level: 2
    }
  ],
  510000: [
    {
      id: 510100,
      name: '成都市',
      pid: 510000,
      level: 2
    },
    {
      id: 510300,
      name: '自贡市',
      pid: 510000,
      level: 2
    },
    {
      id: 510400,
      name: '攀枝花市',
      pid: 510000,
      level: 2
    },
    {
      id: 510500,
      name: '泸州市',
      pid: 510000,
      level: 2
    },
    {
      id: 510600,
      name: '德阳市',
      pid: 510000,
      level: 2
    },
    {
      id: 510700,
      name: '绵阳市',
      pid: 510000,
      level: 2
    },
    {
      id: 510800,
      name: '广元市',
      pid: 510000,
      level: 2
    },
    {
      id: 510900,
      name: '遂宁市',
      pid: 510000,
      level: 2
    },
    {
      id: 511000,
      name: '内江市',
      pid: 510000,
      level: 2
    },
    {
      id: 511100,
      name: '乐山市',
      pid: 510000,
      level: 2
    },
    {
      id: 511300,
      name: '南充市',
      pid: 510000,
      level: 2
    },
    {
      id: 511400,
      name: '眉山市',
      pid: 510000,
      level: 2
    },
    {
      id: 511500,
      name: '宜宾市',
      pid: 510000,
      level: 2
    },
    {
      id: 511600,
      name: '广安市',
      pid: 510000,
      level: 2
    },
    {
      id: 511700,
      name: '达州市',
      pid: 510000,
      level: 2
    },
    {
      id: 511800,
      name: '雅安市',
      pid: 510000,
      level: 2
    },
    {
      id: 511900,
      name: '巴中市',
      pid: 510000,
      level: 2
    },
    {
      id: 512000,
      name: '资阳市',
      pid: 510000,
      level: 2
    },
    {
      id: 513200,
      name: '阿坝藏族羌族自治州',
      pid: 510000,
      level: 2
    },
    {
      id: 513300,
      name: '甘孜藏族自治州',
      pid: 510000,
      level: 2
    },
    {
      id: 513400,
      name: '凉山彝族自治州',
      pid: 510000,
      level: 2
    }
  ],
  520000: [
    {
      id: 520100,
      name: '贵阳市',
      pid: 520000,
      level: 2
    },
    {
      id: 520200,
      name: '六盘水市',
      pid: 520000,
      level: 2
    },
    {
      id: 520300,
      name: '遵义市',
      pid: 520000,
      level: 2
    },
    {
      id: 520400,
      name: '安顺市',
      pid: 520000,
      level: 2
    },
    {
      id: 520500,
      name: '毕节市',
      pid: 520000,
      level: 2
    },
    {
      id: 520600,
      name: '铜仁市',
      pid: 520000,
      level: 2
    },
    {
      id: 522300,
      name: '黔西南布依族苗族自治州',
      pid: 520000,
      level: 2
    },
    {
      id: 522600,
      name: '黔东南苗族侗族自治州',
      pid: 520000,
      level: 2
    },
    {
      id: 522700,
      name: '黔南布依族苗族自治州',
      pid: 520000,
      level: 2
    }
  ],
  530000: [
    {
      id: 530100,
      name: '昆明市',
      pid: 530000,
      level: 2
    },
    {
      id: 530300,
      name: '曲靖市',
      pid: 530000,
      level: 2
    },
    {
      id: 530400,
      name: '玉溪市',
      pid: 530000,
      level: 2
    },
    {
      id: 530500,
      name: '保山市',
      pid: 530000,
      level: 2
    },
    {
      id: 530600,
      name: '昭通市',
      pid: 530000,
      level: 2
    },
    {
      id: 530700,
      name: '丽江市',
      pid: 530000,
      level: 2
    },
    {
      id: 530800,
      name: '普洱市',
      pid: 530000,
      level: 2
    },
    {
      id: 530900,
      name: '临沧市',
      pid: 530000,
      level: 2
    },
    {
      id: 532300,
      name: '楚雄彝族自治州',
      pid: 530000,
      level: 2
    },
    {
      id: 532500,
      name: '红河哈尼族彝族自治州',
      pid: 530000,
      level: 2
    },
    {
      id: 532600,
      name: '文山壮族苗族自治州',
      pid: 530000,
      level: 2
    },
    {
      id: 532800,
      name: '西双版纳傣族自治州',
      pid: 530000,
      level: 2
    },
    {
      id: 532900,
      name: '大理白族自治州',
      pid: 530000,
      level: 2
    },
    {
      id: 533100,
      name: '德宏傣族景颇族自治州',
      pid: 530000,
      level: 2
    },
    {
      id: 533300,
      name: '怒江傈僳族自治州',
      pid: 530000,
      level: 2
    },
    {
      id: 533400,
      name: '迪庆藏族自治州',
      pid: 530000,
      level: 2
    }
  ],
  540000: [
    {
      id: 540100,
      name: '拉萨市',
      pid: 540000,
      level: 2
    },
    {
      id: 540200,
      name: '日喀则市',
      pid: 540000,
      level: 2
    },
    {
      id: 540300,
      name: '昌都市',
      pid: 540000,
      level: 2
    },
    {
      id: 540400,
      name: '林芝市',
      pid: 540000,
      level: 2
    },
    {
      id: 540500,
      name: '山南市',
      pid: 540000,
      level: 2
    },
    {
      id: 540600,
      name: '那曲市',
      pid: 540000,
      level: 2
    },
    {
      id: 542500,
      name: '阿里地区',
      pid: 540000,
      level: 2
    }
  ],
  610000: [
    {
      id: 610100,
      name: '西安市',
      pid: 610000,
      level: 2
    },
    {
      id: 610200,
      name: '铜川市',
      pid: 610000,
      level: 2
    },
    {
      id: 610300,
      name: '宝鸡市',
      pid: 610000,
      level: 2
    },
    {
      id: 610400,
      name: '咸阳市',
      pid: 610000,
      level: 2
    },
    {
      id: 610500,
      name: '渭南市',
      pid: 610000,
      level: 2
    },
    {
      id: 610600,
      name: '延安市',
      pid: 610000,
      level: 2
    },
    {
      id: 610700,
      name: '汉中市',
      pid: 610000,
      level: 2
    },
    {
      id: 610800,
      name: '榆林市',
      pid: 610000,
      level: 2
    },
    {
      id: 610900,
      name: '安康市',
      pid: 610000,
      level: 2
    },
    {
      id: 611000,
      name: '商洛市',
      pid: 610000,
      level: 2
    }
  ],
  620000: [
    {
      id: 620100,
      name: '兰州市',
      pid: 620000,
      level: 2
    },
    {
      id: 620200,
      name: '嘉峪关市',
      pid: 620000,
      level: 2
    },
    {
      id: 620300,
      name: '金昌市',
      pid: 620000,
      level: 2
    },
    {
      id: 620400,
      name: '白银市',
      pid: 620000,
      level: 2
    },
    {
      id: 620500,
      name: '天水市',
      pid: 620000,
      level: 2
    },
    {
      id: 620600,
      name: '武威市',
      pid: 620000,
      level: 2
    },
    {
      id: 620700,
      name: '张掖市',
      pid: 620000,
      level: 2
    },
    {
      id: 620800,
      name: '平凉市',
      pid: 620000,
      level: 2
    },
    {
      id: 620900,
      name: '酒泉市',
      pid: 620000,
      level: 2
    },
    {
      id: 621000,
      name: '庆阳市',
      pid: 620000,
      level: 2
    },
    {
      id: 621100,
      name: '定西市',
      pid: 620000,
      level: 2
    },
    {
      id: 621200,
      name: '陇南市',
      pid: 620000,
      level: 2
    },
    {
      id: 622900,
      name: '临夏回族自治州',
      pid: 620000,
      level: 2
    },
    {
      id: 623000,
      name: '甘南藏族自治州',
      pid: 620000,
      level: 2
    }
  ],
  630000: [
    {
      id: 630100,
      name: '西宁市',
      pid: 630000,
      level: 2
    },
    {
      id: 630200,
      name: '海东市',
      pid: 630000,
      level: 2
    },
    {
      id: 632200,
      name: '海北藏族自治州',
      pid: 630000,
      level: 2
    },
    {
      id: 632300,
      name: '黄南藏族自治州',
      pid: 630000,
      level: 2
    },
    {
      id: 632500,
      name: '海南藏族自治州',
      pid: 630000,
      level: 2
    },
    {
      id: 632600,
      name: '果洛藏族自治州',
      pid: 630000,
      level: 2
    },
    {
      id: 632700,
      name: '玉树藏族自治州',
      pid: 630000,
      level: 2
    },
    {
      id: 632800,
      name: '海西蒙古族藏族自治州',
      pid: 630000,
      level: 2
    }
  ],
  640000: [
    {
      id: 640100,
      name: '银川市',
      pid: 640000,
      level: 2
    },
    {
      id: 640200,
      name: '石嘴山市',
      pid: 640000,
      level: 2
    },
    {
      id: 640300,
      name: '吴忠市',
      pid: 640000,
      level: 2
    },
    {
      id: 640400,
      name: '固原市',
      pid: 640000,
      level: 2
    },
    {
      id: 640500,
      name: '中卫市',
      pid: 640000,
      level: 2
    }
  ],
  650000: [
    {
      id: 650100,
      name: '乌鲁木齐市',
      pid: 650000,
      level: 2
    },
    {
      id: 650200,
      name: '克拉玛依市',
      pid: 650000,
      level: 2
    },
    {
      id: 650400,
      name: '吐鲁番市',
      pid: 650000,
      level: 2
    },
    {
      id: 650500,
      name: '哈密市',
      pid: 650000,
      level: 2
    },
    {
      id: 652300,
      name: '昌吉回族自治州',
      pid: 650000,
      level: 2
    },
    {
      id: 652700,
      name: '博尔塔拉蒙古自治州',
      pid: 650000,
      level: 2
    },
    {
      id: 652800,
      name: '巴音郭楞蒙古自治州',
      pid: 650000,
      level: 2
    },
    {
      id: 652900,
      name: '阿克苏地区',
      pid: 650000,
      level: 2
    },
    {
      id: 653000,
      name: '克孜勒苏柯尔克孜自治州',
      pid: 650000,
      level: 2
    },
    {
      id: 653100,
      name: '喀什地区',
      pid: 650000,
      level: 2
    },
    {
      id: 653200,
      name: '和田地区',
      pid: 650000,
      level: 2
    },
    {
      id: 654000,
      name: '伊犁哈萨克自治州',
      pid: 650000,
      level: 2
    },
    {
      id: 654200,
      name: '塔城地区',
      pid: 650000,
      level: 2
    },
    {
      id: 654300,
      name: '阿勒泰地区',
      pid: 650000,
      level: 2
    },
    {
      id: 659000,
      name: '自治区直辖县级行政区划',
      pid: 650000,
      level: 2
    }
  ],
}

export { province, city }
