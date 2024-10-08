<template>
  <div>
    <div class="container" :style='{"minHeight":"100vh","alignItems":"flex-start","background":"url(http://codegen.caihongy.cn/20240217/78ab35971e614cf992ee3efbba708fd7.jpg)","display":"flex","width":"100%","backgroundSize":"100% 100%","backgroundPosition":"center center","backgroundRepeat":"no-repeat","justifyContent":"center"}'>
      <el-form :style='{"border":"1px solid #999","padding":"40px 80px 40px 120px","boxShadow":"inset 0px 0px 56px 0px #000","margin":"150px auto 0","alignItems":"flex-start","textAlign":"center","display":"flex","minHeight":"450px","borderRadius":"20px","flexWrap":"wrap","background":"#fff","width":"680px","fontSize":"14px","height":"auto"}'>
        <div v-if="true" :style='{"padding":"0px","margin":"0 0 20px","borderColor":"#ddd","color":"#333","textAlign":"left","display":"inline-block","background":"none","borderWidth":"0px","width":"86%","lineHeight":"30px","fontSize":"18px","borderStyle":"solid","fontWeight":"500"}' class="title-container">在线考试系统登录</div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"100%","margin":"0 0 10px","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"color":"#333","left":"-100px","textAlign":"right","width":"100px","lineHeight":"44px","fontSize":"inherit","position":"absolute"}'>用户名：</div>
          <input :style='{"border":"1px solid #eee","padding":"0 10px","boxShadow":"0 0 0px rgba(64, 158, 255, .3)","color":"#666","borderRadius":"20px","background":"#fff","width":"100%","fontSize":"inherit","height":"40px"}' placeholder="请输入用户名" name="username" type="text" v-model="rulesForm.username">
        </div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"100%","margin":"0 0 10px","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"color":"#333","left":"-100px","textAlign":"right","width":"100px","lineHeight":"44px","fontSize":"inherit","position":"absolute"}'>密码：</div>
          <input :style='{"border":"1px solid #eee","padding":"0 10px","boxShadow":"0 0 0px rgba(64, 158, 255, .3)","color":"#666","borderRadius":"20px","background":"#fff","width":"100%","fontSize":"inherit","height":"40px"}' placeholder="请输入密码" name="password" type="password" v-model="rulesForm.password">
        </div>

		<div class="list-item select" :style='{"width":"100%","margin":"0 0 10px","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}' v-if="roles.length>1">
		  <el-select v-model="rulesForm.role" placeholder="请选择角色">
		    <el-option v-for="item in roles" :key="item.roleName" :label="item.roleName" :value="item.roleName" />
		  </el-select>
		</div>

		<div v-if="flag" class="mask" style="position: fixed;z-index: 998;top: 0;right: 0;left: 0;bottom: 0;background: rgba(0,0,0,.5);"></div>
		<!-- option3 -->
		<div v-if="flag" class="box option3" :style='{"padding":"0 24px 24px","transform":"translate3d(-50%,-50%,0)","top":"50%","borderRadius":"20px","left":"50%","background":"#fff","position":"fixed","zIndex":999}'>
			<span @click="flag = !flag" :style='{"cursor":"pointer","padding":"10px","top":"0","fontSize":"20px","position":"absolute","right":"0","zIndex":1}' class="icon iconfont icon-guanbi1 guanbi"></span>
			<div :style='{"lineHeight":"40px","fontSize":"18px","color":"#000","textAlign":"center"}'>身份验证</div>
			<div :style='{"width":"300px","padding":"20px","height":"auto"}' id="option3" class="rotateverify-contaniner">
				<div :style='{"position":"relative"}' class="rotate-can-wrap">
					<canvas width="500" height="500" :style='{"width":"260px","height":"260px"}' class="rotateCan rotate-can"></canvas>
					<span :style='{"padding":"80px","backgroundColor":"rgba(0,0,0,.3)","color":"#fff","display":"none","top":0,"borderRadius":"100%","left":0,"width":"260px","fontSize":"100px","position":"absolute","backgroundPosition":"center center","backgroundRepeat":"no-repeat","height":"260px"}' class="icon iconfont statusBg"></span>
				</div>
				<div :style='{"margin":"10px 0 0","borderRadius":"40px","background":"#f7f7f7","clear":"both","width":"100%","position":"relative","height":"40px"}' class="control-wrap slideDragWrap">
					<div :style='{"width":"100%","position":"relative","height":"100%"}' class="control-tips">
						<p :style='{"overflow":"hidden","whiteSpace":"nowrap","top":0,"color":"#333","textAlign":"center","left":0,"width":"100%","lineHeight":"40px","fontSize":"16px","position":"absolute","textOverflow":"ellipsis","height":"40px"}' class="c-tips-txt cTipsTxt">滑动将图片转正</p>
					</div>
					<div :style='{"border":"1px solid transparent","top":0,"borderRadius":"40px","left":0,"width":"40px","position":"absolute","height":"40px"}' class="control-bor-wrap controlBorWrap"></div>
					<div :style='{"border":"1px solid #e0e0e0","top":0,"borderRadius":"40px","alignItems":"center","color":"#666","left":0,"background":"#fff","display":"flex","width":"40px","position":"absolute","justifyContent":"center","height":"40px"}' class="control-btn slideDragBtn">
						<span :style='{"color":"inherit","fontSize":"18px"}' class="icon iconfont icon-gengduo1"></span>
					</div>
				</div>
			</div>
		</div>
		
        <div :style='{"margin":"10px 0 0","alignItems":"center","flexWrap":"wrap","background":"none","display":"flex","width":"100%","fontSize":"16px","position":"relative","justifyContent":"flex-start"}'>
          <el-button v-if="loginType==1" :style='{"border":"1px solid #666","cursor":"pointer","padding":"0 24px","margin":"0 0 10px","color":"#fff","textAlign":"center","letterSpacing":"4px","borderRadius":"20px","background":"#333","width":"auto","fontSize":"16px","height":"40px","order":"0"}' type="primary" @click="login()" class="loginInBt">登录</el-button>
          <el-button :style='{"border":"0px solid rgba(64, 158, 255, 1)","cursor":"pointer","padding":"0 10px","margin":"0 5px 10px","borderColor":"rgba(167,142,68,1)","color":"#666","borderRadius":"0px","background":"none","borderWidth":"0px","width":"auto","fontSize":"14px","borderStyle":"solid","fontWeight":"500","height":"auto"}' type="primary" @click="register('jiaoshi')" class="register">注册教师</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>
<script>
import menu from "@/utils/menu";
export default {
  data() {
    return {
		verifyCheck2: false,
		flag: false,
      baseUrl:this.$base.url,
      loginType: 1,
      rulesForm: {
        username: "",
        password: "",
        role: "",
      },
      menus: [],
      roles: [],
      tableName: "",
    };
  },
  mounted() {
    let menus = menu.list();
    this.menus = menus;

    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].hasBackLogin=='是') {
        this.roles.push(this.menus[i])
      }
    }

  },
  created() {

  },
  destroyed() {
	    },
  components: {
  },
  methods: {
	setVerify() {
		this.flag = true



		this.$nextTick(() => {
			new RotateVerify('#option3', {
				initText: '滑动将图片转正',
				slideImage: [{"name":"001.jpg","uid":1692859142709,"url":"http://codegen.caihongy.cn/20230824/b3ec4ddc16544ce38bc74612b49b4f0b.jpg","status":"success"},{"name":"002.jpg","uid":1692859146258,"url":"http://codegen.caihongy.cn/20230824/6d64ba55973f408e93bfd61e0c18714c.jpg","status":"success"},{"name":"003.jpg","uid":1692859152656,"url":"http://codegen.caihongy.cn/20230824/9d05f99bbefe49fcae6b42e6711e32a6.jpg","status":"success"}].map((item)=>{return item.url}),
				slideAreaNum: 10,
				getSuccessState: () => {
				setTimeout(()=>{
				  this.flag = false
				  this.loginPost()
				},2500)
				}
			})
		})

	},

    //注册
    register(tableName){
		this.$storage.set("loginTable", tableName);
		this.$router.push({path:'/register',query:{pageFlag:'register'}})
    },
    // 登陆
    login() {

		if (!this.rulesForm.username) {
			this.$message.error("请输入用户名");
			return;
		}
		if (!this.rulesForm.password) {
			this.$message.error("请输入密码");
			return;
		}
		if(this.roles.length>1) {
			if (!this.rulesForm.role) {
				this.$message.error("请选择角色");
				return;
			}

			let menus = this.menus;
			for (let i = 0; i < menus.length; i++) {
				if (menus[i].roleName == this.rulesForm.role) {
					this.tableName = menus[i].tableName;
				}
			}
		} else {
			this.tableName = this.roles[0].tableName;
			this.rulesForm.role = this.roles[0].roleName;
		}
		

		this.setVerify()

    },
	loginPost() {
		this.$http({
			url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
			method: "post"
		}).then(({ data }) => {
			if (data && data.code === 0) {
				this.$storage.set("Token", data.token);
				this.$storage.set("role", this.rulesForm.role);
				this.$storage.set("sessionTable", this.tableName);
				this.$storage.set("adminName", this.rulesForm.username);
				this.$router.replace({ path: "/" });
			} else {
				this.$message.error(data.msg);
			}
		});
	},
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
      background: url(http://codegen.caihongy.cn/20240217/78ab35971e614cf992ee3efbba708fd7.jpg);
        
  .list-item /deep/ .el-input .el-input__inner {
		border: 1px solid #eee;
		border-radius: 20px;
		padding: 0 10px;
		box-shadow: 0 0 0px rgba(64, 158, 255, .3);
		color: #666;
		background: #fff;
		width: 100%;
		font-size: inherit;
		height: 40px;
	  }
  
  .list-item.select /deep/ .el-select .el-input__inner {
		border: 1px solid #eee;
		border-radius: 20px;
		padding: 0 10px;
		margin: 0;
		color: #666;
		background: #fff;
		width: 100%;
		font-size: 14px;
		min-width: 260px;
		height: 40px;
	  }
  
  .list-code /deep/ .el-input .el-input__inner {
  	  	border: 1px solid #eee;
  	  	border-radius: 20px 0 0 20px;
  	  	padding: 0 10px;
  	  	color: #666;
  	  	background: #fff;
  	  	width: calc(100% - 80px);
  	  	font-size: inherit;
  	  	height: 40px;
  	  }

  .list-type /deep/ .el-radio__input .el-radio__inner {
		background: rgba(53, 53, 53, 0);
		border-color: #999;
	  }
  .list-type /deep/ .el-radio__input.is-checked .el-radio__inner {
        background: #2b9afc;
        border-color: #2b9afc;
      }
  .list-type /deep/ .el-radio__label {
		color: #999;
		font-size: 14px;
	  }
  .list-type /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: #2b9afc;
        font-size: 14px;
      }
}

	#option3 /deep/ .control-bor-wrap {
				border: 1px solid transparent;
				border-radius: 40px;
				top: 0;
				left: 0;
				width: 40px;
				position: absolute;
				height: 40px;
			}
	
	#option3 /deep/ .control-bor-wrap.control-bor-active {
				border: 1px solid #1a91ed;
			}
	
	#option3 /deep/ .control-bor-wrap.control-bor-suc {
				border: 1px solid rgb(92, 184, 92);
			}
	
	#option3 /deep/ .control-bor-wrap.control-bor-err {
				border: 1px solid red;
			}
	
	#option3 /deep/ .control-btn-wrap {
				border: 1px solid #e0e0e0;
				border-radius: 40px;
				top: 0;
				color: #666;
				left: 0;
				background: #fff;
				display: flex;
				width: 40px;
				justify-content: center;
				align-items: center;
				position: absolute;
				height: 40px;
			}
	
	#option3 /deep/ .control-btn-wrap.control-btn-active {
				color: #fff;
				background: #1a91ed;
			}
	
	#option3 /deep/ .control-btn-wrap.control-btn-suc {
				color: #fff;
				background: rgb(92, 184, 92);
			}
	
	#option3 /deep/ .control-btn-wrap.control-btn-err {
				color: #fff;
				background: red;
			}
</style>
