<template>
	<div>

	<div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":"url(http://codegen.caihongy.cn/20230922/735087380ee74ae5b7d67094b120ecee.jpg)","display":"flex","width":"100%","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"no-repeat","justifyContent":"center"}'>
		<el-form class='rgs-form' v-if="pageFlag=='register'" :style='{"padding":"20px 0","margin":"120px auto 60px","borderRadius":"12px","background":"#fff","width":"35vw","position":"relative","height":"auto"}' ref="registerForm" :model="registerForm" :rules="rules">
			<div v-if="false" :style='{"width":"100%","margin":"0 0 10px 0","lineHeight":"44px","fontSize":"20px","color":"rgba(64, 158, 255, 1)","textAlign":"center"}'>USER / REGISTER</div>
			<div v-if="true" :style='{"margin":"20px auto 10px","color":"#fff","top":"-110px","textAlign":"center","width":"100%","letterSpacing":"2px","lineHeight":"44px","fontSize":"32px","position":"absolute"}'>在线考试系统注册</p></div>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaoshi'" prop="jiaoshigonghao">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('jiaoshigonghao')?'required':''">教师工号：</div>
				<el-input v-model="registerForm.jiaoshigonghao"  placeholder="请输入教师工号" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaoshi'" prop="mima">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('mima')?'required':''">密码：</div>
				<el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaoshi'" prop="mima2">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('mima')?'required':''">确认密码：</div>
				<el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaoshi'" prop="jiaoshixingming">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('jiaoshixingming')?'required':''">教师姓名：</div>
				<el-input v-model="registerForm.jiaoshixingming"  placeholder="请输入教师姓名" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaoshi'" prop="xingbie">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('xingbie')?'required':''">性别：</div>
                <el-select v-model="registerForm.xingbie" placeholder="请选择性别" >
                  <el-option
                      v-for="(item,index) in jiaoshixingbieOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaoshi'" prop="touxiang">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('touxiang')?'required':''">头像：</div>
                <file-upload
					tip="点击上传头像"
					action="file/upload"
					:limit="1"
					:multiple="true"
					:fileUrls="registerForm.touxiang?registerForm.touxiang:''"
					@change="jiaoshitouxiangUploadChange"
				></file-upload>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaoshi'" prop="zhicheng">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('zhicheng')?'required':''">职称：</div>
                <el-select v-model="registerForm.zhicheng" placeholder="请选择职称" >
                  <el-option
                      v-for="(item,index) in jiaoshizhichengOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaoshi'" prop="lianxidianhua">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('lianxidianhua')?'required':''">联系电话：</div>
				<el-input v-model="registerForm.lianxidianhua"  placeholder="请输入联系电话" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xuesheng'" prop="xuehao">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('xuehao')?'required':''">学号：</div>
				<el-input v-model="registerForm.xuehao"  placeholder="请输入学号" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xuesheng'" prop="mima">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('mima')?'required':''">密码：</div>
				<el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xuesheng'" prop="mima2">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('mima')?'required':''">确认密码：</div>
				<el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xuesheng'" prop="xueshengxingming">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('xueshengxingming')?'required':''">学生姓名：</div>
				<el-input v-model="registerForm.xueshengxingming"  placeholder="请输入学生姓名" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xuesheng'" prop="xingbie">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('xingbie')?'required':''">性别：</div>
                <el-select v-model="registerForm.xingbie" placeholder="请选择性别" >
                  <el-option
                      v-for="(item,index) in xueshengxingbieOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xuesheng'" prop="nianji">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('nianji')?'required':''">年级：</div>
                <el-select v-model="registerForm.nianji" placeholder="请选择年级" >
                  <el-option
                      v-for="(item,index) in xueshengnianjiOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xuesheng'" prop="banji">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('banji')?'required':''">班级：</div>
                <el-select v-model="registerForm.banji" placeholder="请选择班级" >
                  <el-option
                      v-for="(item,index) in xueshengbanjiOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xuesheng'" prop="xueshengshouji">
				<div v-if="true" :style='{"padding":"0 10px","color":"#333","textAlign":"right","background":"none","width":"130px","lineHeight":"36px","fontSize":"14px","minWidth":"80px"}' :class="changeRules('xueshengshouji')?'required':''">学生手机：</div>
				<el-input v-model="registerForm.xueshengshouji"  placeholder="请输入学生手机" />
			</el-form-item>
			<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"20px auto 5px","outline":"none","color":"#fff","borderRadius":"4px","background":"#1abc9e","display":"block","width":"80%","fontSize":"16px","height":"44px"}' type="primary" @click="submitForm('registerForm')">注册</el-button>
			<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0px auto 0px","color":"#666","textAlign":"right","display":"block","outline":"none","borderRadius":"8px","background":"none","width":"80%","fontSize":"16px","height":"44px"}' @click="resetForm('registerForm')">重置</el-button>
			<router-link :style='{"cursor":"pointer","padding":"0 10%","margin":"0 0 40px","color":"rgba(159, 159, 159, 1)","display":"inline-block","lineHeight":"1","fontSize":"14px","textDecoration":"none"}' to="/login">已有账户登录</router-link>
			<div class="idea1" :style='{"width":"100%","background":"red","display":"none","height":"40px"}'></div>
			<div class="idea2" :style='{"width":"100%","background":"blue","display":"none","height":"40px"}'></div>
		</el-form>
    </div>
  </div>
</div>
</template>

<script>

export default {
    //数据集合
    data() {
		return {
            pageFlag : '',
			tableName: '',
			registerForm: {},
			forgetForm: {},
			rules: {},
			requiredRules: {},
            jiaoshixingbieOptions: [],
            jiaoshizhichengOptions: [],
            xueshengxingbieOptions: [],
            xueshengnianjiOptions: [],
            xueshengbanjiOptions: [],
		}
    },
	mounted() {
		if(this.$route.query.pageFlag=='register'){
			
			this.tableName = this.$route.query.role;
			if(this.tableName=='jiaoshi'){
				this.registerForm = {
					jiaoshigonghao: '',
					mima: '',
					mima2: '',
					jiaoshixingming: '',
					xingbie: '',
					touxiang: '',
					zhicheng: '',
					lianxidianhua: '',
				}
			}
			if(this.tableName=='xuesheng'){
				this.registerForm = {
					xuehao: '',
					mima: '',
					mima2: '',
					xueshengxingming: '',
					xingbie: '',
					nianji: '',
					banji: '',
					xueshengshouji: '',
				}
			}
			if ('jiaoshi' == this.tableName) {
				this.requiredRules.jiaoshigonghao = [{ required: true, message: '请输入教师工号', trigger: 'blur' }]
			}
			if ('jiaoshi' == this.tableName) {
				this.requiredRules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('jiaoshi' == this.tableName) {
				this.requiredRules.jiaoshixingming = [{ required: true, message: '请输入教师姓名', trigger: 'blur' }]
			}
			if ('xuesheng' == this.tableName) {
				this.requiredRules.xuehao = [{ required: true, message: '请输入学号', trigger: 'blur' }]
			}
			if ('xuesheng' == this.tableName) {
				this.requiredRules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('xuesheng' == this.tableName) {
				this.requiredRules.xueshengxingming = [{ required: true, message: '请输入学生姓名', trigger: 'blur' }]
			}
			if ('xuesheng' == this.tableName) {
				this.requiredRules.banji = [{ required: true, message: '请输入班级', trigger: 'blur' }]
			}
		}
	},
    created() {
		this.pageFlag = this.$route.query.pageFlag;
		if(this.$route.query.pageFlag=='register'){
		  if ('jiaoshi' == this.tableName) {
			this.rules.jiaoshigonghao = [{ required: true, message: '请输入教师工号', trigger: 'blur' }];
		  }
		  if ('jiaoshi' == this.tableName) {
			this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }];
		  }
		  if ('jiaoshi' == this.tableName) {
			this.rules.jiaoshixingming = [{ required: true, message: '请输入教师姓名', trigger: 'blur' }];
		  }
			this.jiaoshixingbieOptions = "男,女".split(',');
			this.jiaoshizhichengOptions = "高级讲师,讲师,助教,教师,副教授".split(',');
		  if ('jiaoshi' == this.tableName) {
			this.rules.lianxidianhua = [{ required: true, validator: this.$validate.isMobile, trigger: 'blur' }];
		  }
		  if ('xuesheng' == this.tableName) {
			this.rules.xuehao = [{ required: true, message: '请输入学号', trigger: 'blur' }];
		  }
		  if ('xuesheng' == this.tableName) {
			this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }];
		  }
		  if ('xuesheng' == this.tableName) {
			this.rules.xueshengxingming = [{ required: true, message: '请输入学生姓名', trigger: 'blur' }];
		  }
			this.xueshengxingbieOptions = "男,女".split(',');
			this.xueshengnianjiOptions = "大一,大二,大三,大四".split(',');
			this.$http({
			  url: `option/banji/banji`,
			  method: "get",
			  params: {}
			}).then(({ data }) => {
			  if (data && data.code === 0) {
				  this.xueshengbanjiOptions = data.data;
			  }
			});
		  if ('xuesheng' == this.tableName) {
			this.rules.banji = [{ required: true, message: '请输入班级', trigger: 'blur' }];
		  }
		  if ('xuesheng' == this.tableName) {
			this.rules.xueshengshouji = [{ required: true, validator: this.$validate.isMobile, trigger: 'blur' }];
		  }
		}
    },
    //方法集合
    methods: {
		changeRules(name){
			if(this.requiredRules[name]){
				return true
			}
			return false
		},
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
        // 下二随
      jiaoshitouxiangUploadChange(fileUrls) {
          this.registerForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },

        // 多级联动参数


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url=this.tableName+"/register";
				if((!this.registerForm.jiaoshigonghao) && `jiaoshi` == this.tableName){
					this.$message.error(`教师工号不能为空`);
					return
				}
               if(`jiaoshi` == this.tableName && this.registerForm.mima!=this.registerForm.mima2) {
                this.$message.error(`两次密码输入不一致`);
                return
               }
				if((!this.registerForm.mima) && `jiaoshi` == this.tableName){
					this.$message.error(`密码不能为空`);
					return
				}
				if((!this.registerForm.jiaoshixingming) && `jiaoshi` == this.tableName){
					this.$message.error(`教师姓名不能为空`);
					return
				}
					if(`jiaoshi` == this.tableName && this.registerForm.lianxidianhua &&(!this.$validate.isMobile2(this.registerForm.lianxidianhua))){
						this.$message.error(`联系电话应输入手机格式`);
						return
					}
				if((!this.registerForm.xuehao) && `xuesheng` == this.tableName){
					this.$message.error(`学号不能为空`);
					return
				}
               if(`xuesheng` == this.tableName && this.registerForm.mima!=this.registerForm.mima2) {
                this.$message.error(`两次密码输入不一致`);
                return
               }
				if((!this.registerForm.mima) && `xuesheng` == this.tableName){
					this.$message.error(`密码不能为空`);
					return
				}
				if((!this.registerForm.xueshengxingming) && `xuesheng` == this.tableName){
					this.$message.error(`学生姓名不能为空`);
					return
				}
				if((!this.registerForm.banji) && `xuesheng` == this.tableName){
					this.$message.error(`班级不能为空`);
					return
				}
					if(`xuesheng` == this.tableName && this.registerForm.xueshengshouji &&(!this.$validate.isMobile2(this.registerForm.xueshengshouji))){
						this.$message.error(`学生手机应输入手机格式`);
						return
					}
            this.$http.post(url, this.registerForm).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push('/login');
                  }
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.container {
		position: relative;
		background: url(http://codegen.caihongy.cn/20230922/735087380ee74ae5b7d67094b120ecee.jpg);
		
		.el-input {
		  width: auto;
		}
		
		.el-date-editor.el-input {
			width: auto;
		}
		
		.el-form-item /deep/ .el-form-item__content {
						display: flex;
						flex-wrap: wrap;
					}
		
		.rgs-form .el-input /deep/ .el-input__inner {
						border-radius: 0px;
						padding: 0 10px;
						outline: none;
						color: #666;
						width: auto;
						font-size: 14px;
						border-color: #1abc9e30;
						border-width: 0 0 1px;
						border-style: solid;
						min-width: 300px;
						height: 40px;
					}
		
		.rgs-form .el-select /deep/ .el-input__inner {
						border-radius: 0px;
						padding: 0 10px;
						outline: none;
						color: #666;
						width: auto;
						font-size: 14px;
						border-color: #1abc9e30;
						border-width: 0 0 1px;
						border-style: solid;
						min-width: 300px;
						height: 40px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border-radius: 0px;
						padding: 0 10px 0 30px;
						outline: none;
						color: #666;
						width: auto;
						font-size: 14px;
						border-color: #1abc9e30;
						border-width: 0 0 1px;
						border-style: solid;
						min-width: 300px;
						height: 40px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border-radius: 0px;
						padding: 0 10px 0 30px;
						outline: none;
						color: #666;
						width: auto;
						font-size: 14px;
						border-color: #1abc9e30;
						border-width: 0 0 1px;
						border-style: solid;
						min-width: 300px;
						height: 40px;
					}
		
		.rgs-form /deep/ .el-upload--picture-card {
			background: transparent;
			border: 0;
			border-radius: 0;
			width: auto;
			height: auto;
			line-height: initial;
			vertical-align: middle;
		}
		
		.rgs-form /deep/ .upload .upload-img {
		  		  cursor: pointer;
		  		  border-radius: 0px;
		  		  color: #1abc9e80;
		  		  width: 160px;
		  		  font-size: 32px;
		  		  border-color: #1abc9e30;
		  		  border-width: 0 0 1px;
		  		  line-height: 80px;
		  		  border-style: solid;
		  		  text-align: center;
		  		  height: 80px;
		  		}
		
		.rgs-form /deep/ .el-upload-list .el-upload-list__item {
		  		  cursor: pointer;
		  		  border-radius: 0px;
		  		  color: #1abc9e80;
		  		  width: 160px;
		  		  font-size: 32px;
		  		  border-color: #1abc9e30;
		  		  border-width: 0 0 1px;
		  		  line-height: 80px;
		  		  border-style: solid;
		  		  text-align: center;
		  		  height: 80px;
		  		}
		
		.rgs-form /deep/ .el-upload .el-icon-plus {
		  		  cursor: pointer;
		  		  border-radius: 0px;
		  		  color: #1abc9e80;
		  		  width: 160px;
		  		  font-size: 32px;
		  		  border-color: #1abc9e30;
		  		  border-width: 0 0 1px;
		  		  line-height: 80px;
		  		  border-style: solid;
		  		  text-align: center;
		  		  height: 80px;
		  		}
	}
	.required {
		position: relative;
	}
	.required::after{
				color: red;
				left: 120px;
				position: absolute;
				content: "*";
				order: 2;
			}
</style>
