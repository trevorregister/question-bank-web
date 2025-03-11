import BankView from "../domains/banks/views/BankView.vue"
import BanksView from "../domains/banks/views/BanksView.vue"
const banks = [
    {
        path: '/banks',
        name: 'banks',
        component: BanksView,

    },
    {
        path: '/banks/:bankId',
        name: 'bank',
        component: BankView,
        props: true
    }
]
export default banks