import { defineStore } from 'pinia'

//defineStore 是返回一个函数 函数命名最好有use前缀，根据函数来进行下一步操作
const useCommonStore = defineStore('common',{
	state: () => ({
		isShowLoading: false,
		commonLoading: false,
		loadingText: '正在加载'
	}),
	actions: {
		setCommonLoading(isShow, msg, loading) {
			this.isShowLoading = isShow
			this.commonLoading = loading
			this.loadingText = msg
		}
	}
})

export default useCommonStore
