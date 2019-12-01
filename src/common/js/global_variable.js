export default {
    isDetailFoot: false,
    setIsDetailFoot(isDetailFoot){
        this.$nextTick(() => {
            debugger
            this.isDetailFoot = isDetailFoot
        })
    }
}

