// store/page.js
export const useTitlePagesStore = defineStore('TitlePages', {
  state: () => ({
    pageTitle: '',
    drawerstate:true,
  }),
  actions: {
    setPageTitle(title:string) {
      this.pageTitle = title;
    },

    setDrawerState(status:boolean) {
      this.drawerstate = status;
    }
  }
});