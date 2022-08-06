import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import training from "@iconify/icons-ic/round-model-training";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import settingsVoice from "@iconify/icons-ic/settings-voice";
import gallery from "@iconify/icons-eva/image-2-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  // {
  //   title: "dashboard",
  //   path: "/dashboard/app",
  //   icon: getIcon(pieChart2Fill),
  // },
  {
    title: "My NFTs",
    path: "/dashboard/nfts",
    icon: getIcon(settingsVoice),
  },

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
