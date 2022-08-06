import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import ytVideo from '@iconify/icons-ant-design/youtube';
import training from '@iconify/icons-ic/round-model-training';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import robotFill from '@iconify/icons-ant-design/robot-filled';
import gallery from '@iconify/icons-eva/image-2-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  //   {
  //     title: 'recent activities',
  //     path: '/dashboard/recent-activities',
  //     icon: getIcon(news)
  //   },
  {
    title: 'Train',
    path: '/dashboard/train',
    icon: getIcon(training)
  },
  // {
  //   title: 'news',
  //   path: '/dashboard/news',
  //   icon: getIcon(news)
  // },
  {
    title: 'Model',
    path: '/dashboard/model',
    icon: getIcon(robotFill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'gallery',
    path: '/dashboard/gallery',
    icon: getIcon(gallery)
  }
  //   {
  //     title: 'login',
  //     path: '/login',
  //     icon: getIcon(lockFill)
  //   },
  //   {
  //     title: 'register',
  //     path: '/register',
  //     icon: getIcon(personAddFill)
  //   },
  //   {
  //     title: 'Not found',
  //     path: '/404',
  //     icon: getIcon(alertTriangleFill)
  //   }
];

export default sidebarConfig;
