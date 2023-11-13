import relativeTime from 'dayjs/plugin/relativeTime'
import cn from 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale(cn)

export default dayjs
