import Vue from 'vue';

import { 
  Button, 
  Select,
  Option,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Tag,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  // MenuItemGroup,
  Container,
  Carousel,
  CarouselItem,
  Header,
  Aside,
  Main,
  Tooltip,
  Upload,
  Radio,
  Dialog,
  Message,
  Table,
  TableColumn,
  Autocomplete,
  Pagination,
  Popover,
  MessageBox,
  Switch
} from 'element-ui';

Vue.use(Carousel);
Vue.use(CarouselItem)
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tag);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Tooltip);
Vue.use(Upload);
Vue.use(Radio);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Autocomplete);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(Switch);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;
//引入css文件
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';