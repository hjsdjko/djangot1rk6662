<template>
  <div class="main-content" :style='{"color":"#3B3E40","padding":"30px 30px 30px","fontSize":"14px"}'>
    <!-- 列表页 -->
    <template v-if="!showFlag">
      <el-form :style='{"border":"0px solid #bababa","padding":"0 10px","margin":"0 0 20px","overflow":"hidden","borderRadius":"0px","flexWrap":"wrap","background":"none","display":"flex","fontSize":"inherit","justifyContent":"space-between"}' :inline="true" :model="searchForm" class="center-form-pv">
        <el-row :style='{"border":"0px solid #e3e3e3","padding":"10px 0","borderRadius":"5px","textAlign":"center","flexWrap":"wrap","background":"#fff","flexDirection":"row","display":"flex","width":"auto","fontSize":"inherit","justifyContent":"flex-start","order":"2"}'>
			<div :style='{"margin":"0 10px 0 0","fontSize":"inherit","flexWrap":"wrap","display":"flex"}'>
			  <label :style='{"margin":"0 10px 0 0","color":"inherit","display":"inline-block","lineHeight":"40px","fontSize":"inherit","fontWeight":"500","height":"40px"}' class="item-label">试卷</label>
			  <el-input v-model="searchForm.papername" placeholder="试卷名称" clearable></el-input>
			</div>
			<el-button class="search" :style='{"cursor":"pointer","padding":"0px 15px","boxShadow":"inset 0 17px 0 rgba(255, 255, 255, 0.2)","borderColor":"#719e37","margin":"0 10px","color":"#fff","minWidth":"80px","transition":"all 0.3s","borderRadius":"3px","background":"linear-gradient(to bottom, #9bc747 0%,#82bd42 100%)","borderWidth":"1px","width":"auto","fontSize":"16px","lineHeight":"44px","borderStyle":"solid","textShadow":"1px 1px 0 rgba(0, 0, 0, 0.2)","height":"44px"}' type="success" @click="search()">
				<span class="icon iconfont icon-chakan14" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"inline-block","height":"40px"}'></span>
				查询
			</el-button>
		</el-row>
        <el-row class="actions" :style='{"border":"0px solid #e3e3e3","padding":"10px 0","margin":"0","color":"#fff","textAlign":"left","flexDirection":"row","display":"flex","justifyContent":"flex-start","borderRadius":"5px","flexWrap":"wrap","background":"#fff","width":"auto","fontSize":"inherit"}'>
          <download-excel v-if="isAuth('examrecord','导出')" class = "export-excel-wrapper" :data = "dataList" :fields = "json_fields" name = "考试记录.xls">
			<!-- 导出excel -->
			<el-button class="btn18" type="success">
				<span class="icon iconfont icon-daochu4" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"inline-block"}'></span>
				导出
			</el-button>
          </download-excel>
		  <el-button class="btn18" v-if="isAuth('examrecord','打印')" type="success" @click="printJson">
		  	<span class="icon iconfont icon-dayin6" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"inline-block"}'></span>
		  	打印
		  </el-button>
        </el-row>
      </el-form>

	<div :style='{"border":"0px solid #e9e9e9","width":"100%","padding":"0px","margin":"10px 0 0","borderRadius":"5px","background":"rgba(255,255,255,1)"}'>
        <el-table
		  :stripe='false'
		  :style='{"padding":"0","borderColor":"#e6e6e6","color":"inherit","borderRadius":"0px","borderWidth":"1px 1px 0 1px","background":"none","width":"100%","fontSize":"inherit","borderStyle":"solid"}'
          :data="dataList"
          :border='true'
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandler"
          style="width: 100%;"
        >
          <el-table-column :resizable='true' :sortable='true' prop="username" header-align="center" align="center" sortable label="姓名"></el-table-column>
          <el-table-column
		    :resizable='true' :sortable='true'
            prop="papername"
            header-align="center"
            align="center"
            sortable
            label="试卷"
          ></el-table-column>
          <el-table-column
		    :resizable='true' :sortable='true'
            prop="myscore"
            header-align="center"
            align="center"
            sortable
            label="考试得分"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.myscore==0&&scope.row.ismark==0" type="danger">{{scope.row.myscore}}</el-tag>
              <el-tag v-else-if="scope.row.myscore>0&&scope.row.ismark==0" type="success">{{scope.row.myscore}}</el-tag>
              <el-tag v-else-if="scope.row.ismark>0" type="warning">批阅中</el-tag>
            </template>
          </el-table-column>
		  <el-table-column
		    :resizable='true' :sortable='true'
		    prop="accuracy"
		    header-align="center"
		    align="center"
		    sortable
		    label="准确率"
		  >
		    <template slot-scope="scope">
		      <el-tag type="success" v-if="scope.row.ismark==0">{{(scope.row.accuracy * 100).toFixed(0)}}%</el-tag>
			  <el-tag type="warning" v-if="scope.row.ismark>0">/</el-tag>
		    </template>
		  </el-table-column>
		  <el-table-column
		    :resizable='true' :sortable='true'
		    prop="accuracy"
		    header-align="center"
		    align="center"
		    sortable
		    label="错误率"
		  >
		    <template slot-scope="scope">
		      <el-tag type="danger" v-if="scope.row.ismark==0">{{((1 - Number(scope.row.accuracy)) * 100).toFixed(0)}}%</el-tag>
			  <el-tag type="warning" v-if="scope.row.ismark>0">/</el-tag>
		    </template>
		  </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="150"
            label="操作"
          >
            <template slot-scope="scope">
			  <el-button class="view" :style='{"border":"1px solid #0f70ad","cursor":"pointer","padding":"0 10px","boxShadow":"inset 0 1px 0 rgba(255, 255, 255, 0.2)","margin":"5px 5px 5px 0","color":"#fff","minWidth":"40px","transition":"all 0.3s","borderRadius":"3px","background":"linear-gradient(to bottom, #208ed3 0%,#0272bd 100%)","width":"auto","fontSize":"13px","textShadow":"1px 1px 0 rgba(0, 0, 0, 0.2)","height":"40px"}' type="success" @click="addOrUpdateHandler(scope.row)">
			  	<span class="icon iconfont icon-chakan14" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"inline-block","height":"auto"}'></span>
			  	查看
			  </el-button>
			  <el-button class="edit" :style='{"border":"1px solid #719e37","cursor":"pointer","padding":"0 10px","boxShadow":"inset 0 1px 0 rgba(255, 255, 255, 0.2)","margin":"5px 5px 5px 0","color":"#fff","minWidth":"40px","transition":"all 0.3s","borderRadius":"3px","background":"linear-gradient(to bottom, #9bc747 0%,#82bd42 100%)","width":"auto","fontSize":"13px","textShadow":"1px 1px 0 rgba(0, 0, 0, 0.2)","height":"40px"}' v-if="isAuth('examrecord','批卷')&&scope.row.ismark>0" type="primary" @click="gradeClick(scope.row)">
			  	<span class="icon iconfont icon-xiugai10" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"inline-block","height":"auto"}'></span>
			  	批卷
			  </el-button>
            </template>
          </el-table-column>
        </el-table>
	</div>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="pageSize"
          :total="totalPage"
          :layout="layouts.join()"
          prev-text="上一页"
          next-text="下一页"
          :hide-on-single-page="false"
          :style='{"padding":"0","margin":"20px 0 0","whiteSpace":"nowrap","color":"inherit","textAlign":"center","width":"100%","fontSize":"inherit","fontWeight":"500"}'
        ></el-pagination>
    </template>
    <add-or-update v-if="showFlag" :parent="this" ref="addOrUpdate"></add-or-update>
	<el-dialog title="批卷" :visible.sync="gradeVisible" fullscreen>
		<el-card v-for="(item,index) in gradeList" :key="index" style="width: 90%;margin: 10px auto">
			<div style="padding: 20px;box-sizing:border-box;border-bottom:1px solid #eee">
				{{index + 1}}、{{item.questionname}} （ {{item.score}} ）				<el-tag type="success" v-if="item.type==0">单选题</el-tag>
				<el-tag type="warning" v-if="item.type==1">多选题</el-tag>
				<el-tag type="info" v-if="item.type==2">判断题</el-tag>
				<el-tag type="primary" v-if="item.type==3">填空题</el-tag>
				<el-tag type="danger" v-if="item.type==4">主观题</el-tag>
			</div>
			<div style="padding: 10px;box-sizing:border-box">
				考生答案：{{item.myanswer}}
			</div>
			<div style="padding: 10px;box-sizing:border-box" v-if="item.type!=4">
				正确答案：{{item.answer}}
			</div>
			<div style="padding: 20px;box-sizing:border-box">
				解析：{{item.analysis}}
			</div>
			<div style="padding: 20px;box-sizing:border-box;display:flex;align-items:center" v-if="item.type==4">
				评分：<el-input-number v-model="item.myscore" :min="0" :max="100"></el-input-number>
			</div>
		</el-card>
		<span slot="footer" class="dialog-footer">
			<el-button @click="gradeVisible=false">取 消</el-button>
			<el-button type="primary" @click="gradeSave">确 定</el-button>
		</span>
	</el-dialog>
  </div>
</template>
<script>
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
	  layouts: ["prev","pager","next"],
      searchForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: false,
      //导出excel
        json_fields: {
        "姓名": "username",    //常规字段
        "试卷名称": "papername",    //常规字段
        "总分": "myscore",    //常规字段
        },
        json_meta: [
          [
            {
              " key ": " charset ",
              " value ": " utf- 8 "
            }
          ]
        ],
		gradeList:[],
		gradeVisible:false
    };
  },
  mounted() {
    this.init();
    this.getDataList();
  },
  components: {
    AddOrUpdate
  },
  methods: {
    init() {},
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize
      };
      if (this.searchForm.papername) {
        params["papername"] = `%${this.searchForm.papername}%`;
      }
      this.$http({
        url: this.$api.examrecordgroupby,
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    addOrUpdateHandler(row) {
      this.showFlag = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row);
      });
    },
    async printJson() {
      //通过getdata调用后台接口获取数据封装到res
      this.list = this.dataList;
      let data = []
      for (let i=0; i < this.list.length; i++) {
          data.push({
          username: this.list[i].username,
          papername: this.list[i].papername,
          myscore: this.list[i].myscore,
        })
      }
      printJS({
        printable: data,
        properties: [
      {
        field: 'username',
        displayName: '姓名',
        columnSize: 1
      },
      {
        field: 'papername',
        displayName: '试卷名称',
        columnSize: 1
      },
      {
        field: 'myscore',
        displayName: '总分',
        columnSize: 1
      },
        ],
        type: 'json',
        header: '考试记录',
        // 样式设置
        gridStyle: 'border: 2px solid #3971A5;',
        gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;'
      })
    },
	// 批卷
	gradeClick(row) {
		this.$http({
			url: `${this.$api.examrecordpage}`,
			method: 'get',
			params: {
				page:1,
				limit: 100,
				paperid: row.paperid,
				userid: row.userid
			}
		}).then(({data})=>{
			if(data&&data.code==0){
				for(let x in data.data.list){
					if(data.data.list[x].type==4){
						data.data.list[x].myscore = 0
					}
				}
				this.gradeList = data.data.list
				this.gradeVisible = true
			}
		})
	},
	gradeSave(){
		for(let i in this.gradeList){
			this.updaterecord(this.gradeList[i])
		}
		this.$message({
			message: "批卷成功",
			type: "success",
			duration: 1500,
			onClose: () => {
				this.getDataList()
				this.gradeVisible = false
			}
		});
	},
	updaterecord(item){
		item.ismark = 1
		this.$http({
			url: `${this.$api.examrecordupdate}`,
			method: 'post',
			data: item
		}).then(({data})=>{})
	},
  }
};
</script>
<style lang="scss" scoped>
//导出excel
  .export-excel-wrapper{
    display: inline-block;
  }
.form-content {
	background: transparent;
}
.table-content {
	background: transparent;
}
	
	.center-form-pv {
		.el-input {
		  width: auto;
		}
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 1px solid #e3e3e3;
				border-radius: 3px;
				padding: 0 12px;
				color: inherit;
				background: #fff;
				width: 150px;
				font-size: inherit;
				height: 44px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 1px solid #e3e3e3;
				border-radius: 3px;
				padding: 0 10px;
				color: inherit;
				background: #fff;
				width: 150px;
				font-size: inherit;
				height: 44px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 1px solid #e3e3e3;
				border-radius: 3px;
				padding: 0 10px 0 30px;
				color: inherit;
				background: #fff;
				width: 150px;
				font-size: inherit;
				height: 44px;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: inherit;
				background: rgba(254,169,34,0);
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 6px 0;
				background: none;
				border-color: #eee;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				color: #333;
				word-break: break-all;
				white-space: normal;
				font-weight: 600;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}
	
	
	.el-table /deep/ .el-table__body-wrapper tbody {
				padding: 0;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: none;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 2px 0;
				color: inherit;
				background: none;
				font-size: inherit;
				border-color: #eee;
				border-width: 0 1px 1px 0px;
				border-style: solid;
				text-align: left;
			}
	
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 2px 0;
				color: #000;
				background: #f6f6f6;
				font-weight: 500;
				border-color: #e6e6e6;
				border-width: 0 1px 1px 0px;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 2px 0;
				color: inherit;
				background: none;
				font-size: inherit;
				border-color: #eee;
				border-width: 0 1px 1px 0px;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				color: inherit;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: inherit;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 2px;
				padding: 0 5px;
				margin: 0 5px;
				color: inherit;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 2px;
				padding: 0 5px;
				margin: 0 5px;
				color: inherit;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				min-width: 35px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0 5px;
				margin: 0 5px;
				color: #999;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 2px;
				padding: 0 5px;
				margin: 0 5px;
				color: #999;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: inherit;
				background: none;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				text-align: center;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				background: #333;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				text-align: center;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				background: #333;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				text-align: center;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				color: inherit;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				color: inherit;
				width: 100px;
				font-size: inherit;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 0px solid #ddd;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: inherit;
				display: inline-block;
				font-size: inherit;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: none;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: inherit;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				color: inherit;
				display: inline-block;
				width: 50px;
				font-size: inherit;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #eee;
				cursor: pointer;
				padding: 0 0px;
				color: inherit;
				display: inline-block;
				font-size: inherit;
				line-height: 24px;
				border-radius: 3px;
				outline: 0;
				background: none;
				width: auto;
				text-align: center;
				height: 24px;
			}
	
	.center-form-pv .search {
				cursor: pointer;
				padding: 0px 15px;
				margin: 0 10px;
				color: #fff;
				font-size: 16px;
				border-color: #719e37;
				line-height: 44px;
				transition: all 0.3s;
				border-radius: 3px;
				box-shadow: inset 0 17px 0 rgba(255, 255, 255, 0.2);
				text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
				background: linear-gradient(to bottom, #9bc747 0%,#82bd42 100%);
				width: auto;
				border-width: 1px;
				border-style: solid;
				min-width: 80px;
				height: 44px;
			}
	
	.center-form-pv .search:hover {
				transform: scale(1.09) rotate(3deg);
			}
	
	.center-form-pv .actions .btn18 {
				border: 1px solid #323537;
				cursor: pointer;
				padding: 16px 15px;
				margin: 4px 4px 5px;
				color: #fff;
				font-size: inherit;
				transition: all 0.3s;
				border-radius: 3px;
				box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
				text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.4);
				background: linear-gradient(to bottom, #4b4f51 0%,#414547 100%);
				width: auto;
				height: auto;
			}
	
	.center-form-pv .actions .btn18:hover {
				transform: scale(1.09) rotate(3deg);
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view {
				border: 1px solid #0f70ad;
				cursor: pointer;
				padding: 0 10px;
				margin: 5px 5px 5px 0;
				color: #fff;
				font-size: 13px;
				transition: all 0.3s;
				border-radius: 3px;
				box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
				text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
				background: linear-gradient(to bottom, #208ed3 0%,#0272bd 100%);
				width: auto;
				min-width: 40px;
				height: 40px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view:hover {
				transform: scale(1.09) rotate(3deg);
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit {
				border: 1px solid #719e37;
				cursor: pointer;
				padding: 0 10px;
				margin: 5px 5px 5px 0;
				color: #fff;
				font-size: 13px;
				transition: all 0.3s;
				border-radius: 3px;
				box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
				text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
				background: linear-gradient(to bottom, #9bc747 0%,#82bd42 100%);
				width: auto;
				min-width: 40px;
				height: 40px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit:hover {
				transform: scale(1.09) rotate(3deg);
			}
	// list one
	.one .list1-view {
				border: 1px solid #0f70ad;
				cursor: pointer;
				padding: 0 8px 0 4px;
				margin: 0px 5px 5px 0;
				color: #fff;
				font-size: inherit;
				transition: all 0.3s;
				border-radius: 3px;
				box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
				text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
				background: linear-gradient(to bottom, #208ed3 0%,#0272bd 100%);
				width: auto;
				min-width: 58px;
				height: 40px;
			}
	
	.one .list1-view:hover {
				transform: scale(1.09) rotate(3deg);
			}
</style>
