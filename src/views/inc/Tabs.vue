<template>
	<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
		<el-tab-pane
				v-for="(item, index) in editableTabs"
				:key="item.name"
				:label="item.title"
				:name="item.name"
		>

		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		name: "Tabs",
		data() {
			return {
				// editableTabsValue: this.$store.state.menus.editableTabsValue,
				// editableTabs: this.$store.state.menus.editableTabs
			}
		},
		computed: {
			editableTabs: {
				get() {
					return this.$store.state.menus.editableTabs
				},
				set(val) {
					this.$store.state.menus.editableTabs = val
				}
			},
			editableTabsValue: {
				get() {
					return this.$store.state.menus.editableTabsValue
				},
				set(val) {
					this.$store.state.menus.editableTabsValue = val
				}
			}
		},
		methods: {

			removeTab(targetName) {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;

				if (targetName === 'Index') {
					return
				}

				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}

				this.editableTabsValue = activeName;
				this.editableTabs = tabs.filter(tab => tab.name !== targetName);

				this.$router.push({name: activeName})

			},
			clickTab (target) {
        if( target.name === "/sys/users"){
          this.$router.push("/sys/users") //跳到首页
        }else if(target.name === "/sys/project") {
          this.$router.push("/sys/project") //跳到
        }else if(target.name === "/sys/latestproject") {
          this.$router.push("/sys/latestproject") //跳到
        }else{

          this.$router.push({name: target.name}) //路由  /sys/project
          console.log("target.name")
          console.log(target.name)
        }
			}
		}
	}
</script>

<style scoped>

</style>