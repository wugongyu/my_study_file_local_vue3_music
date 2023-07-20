import { Planet, Music, VideoOne, Computer, DownloadThree, Fm, Like, PlayTwo } from "@icon-park/vue-next";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

interface MenuItem {
  name: string;
  key: string;
  icon: any;
  theme: 'outline' | 'filled' | 'two-tone' | 'multi-color';
}

interface MenuList {
  name: string;
  menus: MenuItem[],
}

export function useMenu(){
  const menus: MenuList[] = [
    {
      name: 'onlineMusic',
      menus: [
        {
          name: 'recommend',
          key: 'discover',
          icon: Planet,
          theme: 'outline',
        },
        {
          name: 'music',
          key: 'music',
          icon: Music,
          theme: 'outline',
        },
        {
          name: 'video',
          key: 'video',
          icon: VideoOne,
          theme: 'outline',
        },
        {
          name: 'FM',
          key: 'dj',
          icon: Fm,
          theme: 'outline',
        }
      ],
    },
    {
      name: 'myMusic',
      menus: [
        {
          name: 'myFavorite',
          key: 'love',
          icon: Like,
          theme: 'outline',
        },
        {
          name: 'localSong',
          key: 'local',
          icon: Computer,
          theme: 'outline',
        },
        {
          name: 'download',
          key: 'download',
          icon: DownloadThree,
          theme: 'outline',
        },
        {
          name: 'recently',
          key: 'recently',
          icon: PlayTwo,
          theme: 'outline',
        }
      ],
    }
  ];
  const currentRoute = useRoute();
  const router = useRouter();
  const currentMenuKey = ref(currentRoute.meta.menu);
  watch(
    () => currentRoute.meta.menu,
    (menuKey) => {
      currentMenuKey.value = menuKey;
    }
  )
  const clickHandler = async (menu: MenuItem) => {
    await router.push({ name: menu.key, replace: true });
  }
  return {
    menus,
    clickHandler,
    currentMenuKey
  };
}