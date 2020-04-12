<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
    <el-form :inline="true"  class="demo-form-inline" ref="QueryForm" :model="QueryForm">
    <el-form-item  label='料箱号' prop='box_id'><el-input placeholder='料箱号' v-model='QueryForm.box_id'></el-input></el-form-item>
    <el-form-item  label='WMSID' prop='wms_id'><el-input placeholder='WMSID' v-model='QueryForm.wms_id'></el-input></el-form-item>
    <el-form-item  label='库区编码' prop='area_code'><el-input placeholder='库区编码' v-model='QueryForm.area_code'></el-input></el-form-item>
    <el-form-item  label='托盘大小' prop='size'><el-input placeholder='托盘大小' v-model.number='QueryForm.size'></el-input></el-form-item>
    <el-form-item  label='状态' prop='state'><el-select placeholder='状态'  v-model='QueryForm.state'><el-option label='全部' :value='99'></el-option><el-option label='已分配' :value='0'></el-option><el-option label='已完成未反馈' :value='3'></el-option><el-option label='已完成' :value='4'></el-option></el-select></el-form-item>
    <el-form-item  label='消息类型' prop='messageName'><el-input placeholder='消息类型' v-model='QueryForm.messageName'></el-input></el-form-item>
    <el-form-item  label='位置' prop='location'><el-input placeholder='位置' v-model='QueryForm.location'></el-input></el-form-item>
    <el-form-item  label='重量' prop='weight'><el-input placeholder='重量' v-model.number='QueryForm.weight'></el-input></el-form-item>
    <el-form-item  label='发送状态' prop='sendSwitch'><el-select placeholder='发送状态'  v-model='QueryForm.sendSwitch'><el-option label='全部' :value='99'></el-option><el-option label='未发送' :value='0'></el-option><el-option label='A库已发送' :value='1'></el-option><el-option label='B库已发送' :value='2'></el-option><el-option label='F库已发送' :value='3'></el-option></el-select></el-form-item>
    <el-form-item  label='源地址' prop='source_code'><el-input placeholder='源地址' v-model='QueryForm.source_code'></el-input></el-form-item>
      <el-form-item class="btnQuery">
        <el-button type="primary"  @click="Query">查询</el-button>
      </el-form-item>
      <el-form-item class="btnQuery">
    <el-button  @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
       </div>
       <div class="form-bar" >
    <el-button-group>
   <el-button type="primary" icon="el-icon-plus" @click="BarAdd">新增</el-button>
   <el-button type="primary" icon="el-icon-edit" @click="BarEdit">编辑</el-button>
   <el-button type="primary" icon="el-icon-delete" @click="Bardelete">删除</el-button>
   </el-button-group>
       </div>
     <div class="app-card-body app-card-list ">
        <el-table    :data="RoletableData"  style="width: 100%"
         v-loading="loading"
        @selection-change='SelectedChange'
        header-row-class-name="app_heard"
        row-class-name=''
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white"
       >
            <el-table-column prop="id"  type="selection" align="center"  width="40"></el-table-column>
            <el-table-column prop="line_id" label="任务ID" align="center"></el-table-column>
            <el-table-column prop="box_id" label="料箱号" align="center"></el-table-column>
            <el-table-column prop="wms_id" label="WMSID" align="center"></el-table-column>
            <el-table-column prop="area_code" label="库区编码" align="center"></el-table-column>
            <el-table-column prop="source_code" label="源地址" align="center"></el-table-column>
            <el-table-column prop="size" label="托盘大小" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" align="center">
               <template slot-scope="scope">
                <el-tag class="statetag "  :class="Statusclass(scope.row.state)" disable-transitions>{{sendstatesformat(scope.row.state)}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center"></el-table-column>
            <el-table-column prop="messageName"  width="110" label="消息类型" align="center"></el-table-column>
            <el-table-column prop="location" width="100" label="位置" align="center"></el-table-column>
             <el-table-column prop="s_location" label="原库位" align="center"></el-table-column>
            <el-table-column prop="d_location" label="新库位" align="center"></el-table-column>
            <el-table-column prop="priority" label="优先级" align="center"></el-table-column>
            <el-table-column prop="weight" label="重量" align="center"></el-table-column>
            <el-table-column prop="s_station" label="取货站台" align="center"></el-table-column>
            <el-table-column prop="d_station" label="放货站台" align="center"></el-table-column>
            <el-table-column prop="create_time" width="180" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="sendSwitch" label="发送状态" align="center">
                <template slot-scope="scope">
                <el-tag class="statetag "  :class="Statusclass(scope.row.sendSwitch)" disable-transitions>{{taskstatesformat(scope.row.sendSwitch)}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="weightSendSwitch" width="110" label="重量发送状态" align="center"></el-table-column>
      <el-table-column label="操作" width="180"  align="center" >
        <template slot-scope="scope" >
          <div><a  @click="AppEdit(scope.$index, scope.row)">编辑</a>
          <div class="ivu-divider ivu-divider-vertical ivu-divider-default"></div>
           <a  @click="AppDelete(scope.$index, scope.row)">删除</a>
          </div>
      </template>
    </el-table-column>
        </el-table>
        <div class="app-pagination">
         <elPagination :url='url' ref="Page" :parameter='QueryForm'  v-on:get="(data) => { RoletableData = data }"  v-on:loading='(isloading) => { loading = isloading }' ></elPagination>
        </div>
       </div>
      </div>
    </div>
    <el-dialog
      title="编辑"
      @close="resetdialog"
      :append-to-body='true'
      :visible.sync="dialogVisible"
      width="1000px">
      <el-form :model="ruleForm" class="demo-form-inline" :inline="true" label-width="110px" :rules="rules" ref='ruleForm'>
      <el-form-item class='col-2' label='任务ID' prop='line_id'><el-input placeholder='任务ID' v-model.number='ruleForm.line_id'></el-input></el-form-item>
      <el-form-item class='col-2' label='料箱号' prop='box_id'><el-input placeholder='料箱号' v-model='ruleForm.box_id'></el-input></el-form-item>
      <el-form-item class='col-2' label='WMSID' prop='wms_id'><el-input placeholder='WMSID' v-model='ruleForm.wms_id'></el-input></el-form-item>
      <el-form-item class='col-2' label='库区编码' prop='area_code'><el-input placeholder='库区编码' v-model='ruleForm.area_code'></el-input></el-form-item>
      <el-form-item class='col-2' label='源地址' prop='source_code'><el-input placeholder='源地址' v-model='ruleForm.source_code'></el-input></el-form-item>
      <el-form-item class='col-2' label='托盘大小' prop='size'><el-input placeholder='托盘大小' v-model.number='ruleForm.size'></el-input></el-form-item>
      <el-form-item class='col-2' label='状态' prop='state'><el-select placeholder='状态'  v-model='ruleForm.state'><el-option label='已分配' :value='0'></el-option><el-option label='已完成未反馈' :value='3'></el-option><el-option label='完成' :value='4'></el-option></el-select></el-form-item>
      <el-form-item class='col-2' label='类型' prop='type'><el-select placeholder='类型'  v-model='ruleForm.type'><el-option label='未知' :value='0'></el-option><el-option label='料箱' :value='1'></el-option><el-option label='托盘' :value='2'></el-option></el-select></el-form-item>
      <el-form-item class='col-2' label='消息类型' prop='messageName'><el-input placeholder='消息类型' v-model='ruleForm.messageName'></el-input></el-form-item>
      <el-form-item class='col-2' label='位置' prop='location'><el-input placeholder='位置' v-model='ruleForm.location'></el-input></el-form-item>
      <el-form-item class='col-2' label='原库位' prop='s_location'><el-input placeholder='原库位' v-model='ruleForm.s_location'></el-input></el-form-item>
      <el-form-item class='col-2' label='新库位' prop='d_location'><el-input placeholder='新库位' v-model='ruleForm.d_location'></el-input></el-form-item>
      <el-form-item class='col-2' label='优先级' prop='priority'><el-input placeholder='优先级' v-model.number='ruleForm.priority'></el-input></el-form-item>
      <el-form-item class='col-2' label='重量' prop='weight'><el-input placeholder='重量' v-model.number='ruleForm.weight'></el-input></el-form-item>
      <el-form-item class='col-2' label='取货站台' prop='s_station'><el-input placeholder='取货站台' v-model.number='ruleForm.s_station'></el-input></el-form-item>
      <el-form-item class='col-2' label='放货站台' prop='d_station'><el-input placeholder='放货站台' v-model.number='ruleForm.d_station'></el-input></el-form-item>
      <el-form-item class='col-2'  label='创建时间' prop='create_time'><el-date-picker placeholder='创建时间' v-model='ruleForm.create_time'></el-date-picker></el-form-item>
      <el-form-item class='col-2' label='发送状态' prop='sendSwitch'><el-select placeholder='发送状态'  v-model='ruleForm.sendSwitch'><el-option label='未发送' :value='0'></el-option><el-option label='A库已发送' :value='1'></el-option><el-option label='B库已发送' :value='2'></el-option><el-option label='F库已发送' :value='3'></el-option></el-select></el-form-item>
      <el-form-item class='col-2' label='重量发送状态' prop='weightSendSwitch'><el-select placeholder='重量发送状态'  v-model='ruleForm.weightSendSwitch'><el-option label='未发送' :value='0'></el-option><el-option label='已发送' :value='1'></el-option></el-select></el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import elPagination from '@/components/Pagination'
export default {
  components: { elPagination },
  data () {
    return {
      url: '/api/line_check',
      RoletableData: [],
      loading: true, // loading加载
      QueryForm: { box_id: '',
        wms_id: '',
        area_code: '',
        size: null,
        state: 99,
        messageName: '',
        location: '',
        weight: null,
        sendSwitch: 99,
        source_code: ''
      },
      dialogVisible: false, // dialog显示
      rules: { // 表单验证
        line_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
        box_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
        wms_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
        area_code: [{ required: true, message: '不能为空', trigger: 'blur' }],
        source_code: [{ required: true, message: '不能为空', trigger: 'blur' }],
        size: [{ required: true, message: '不能为空', trigger: 'blur' }],
        state: [{ required: true, message: '不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '不能为空', trigger: 'blur' }],
        messageName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        // location: [{ required: true, message: '不能为空', trigger: 'blur' }],
        // d_location: [{ required: true, message: '不能为空', trigger: 'blur' }],
        // s_location: [{ required: true, message: '不能为空', trigger: 'blur' }],
        priority: [{ required: true, message: '不能为空', trigger: 'blur' }],
        weight: [{ required: true, message: '不能为空', trigger: 'blur' }],
        json: [{ required: true, message: '不能为空', trigger: 'blur' }],
        s_station: [{ required: true, message: '不能为空', trigger: 'blur' }],
        d_station: [{ required: true, message: '不能为空', trigger: 'blur' }],
        create_time: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sendSwitch: [{ required: true, message: '不能为空', trigger: 'blur' }],
        weightSendSwitch: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      ruleForm: {}, // 表单模型
      Isedit: false, // 是否编辑
      TableSelect: []
    }
  },
  created  () {

  },
  methods: {
    taskstatesformat (state) {
      if (state === 0) {
        return '未发送'
      } else if (state === 1) {
        return 'A库已发'
      } else if (state === 2) {
        return 'B库已发'
      } else if (state === 3) {
        return 'F库已发'
      } else {
        return '未知'
      }
    },
    sendstatesformat (state) {
      if (state === 0) {
        return '已分配'
      } else if (state === 3) {
        return '未反馈'
      } else if (state === 4) {
        return '已完成'
      } else {
        return '未知'
      }
    },
    Statusclass (state) {
      if (state === 0) {
        return 'tag-warn'
      } else if (state === 1) {
        return 'tag-succeed'
      } else if (state === 2) {
        return 'tag-error'
      } else if (state === 3) {
        return 'tag-succeed'
      } else if (state === 4) {
        return 'tag-error'
      } else {
        return 'tag-error'
      }
    },
    // 查询
    Query () {
      this.$refs.Page.refresh()
    },
    // 表格编辑
    AppEdit (index, row) {
      this.Isedit = true
      this.dialogVisible = true
      this.$nextTick(() => {
        this.ruleForm = JSON.parse(JSON.stringify(row))
      })
    },
    // 工具栏新增
    BarAdd () {
      this.dialogVisible = true
      this.Isedit = false
      this.$nextTick(() => {
        this.ruleForm = {}
      })
    },
    // 表格删除
    AppDelete (index, row) {
      this.$confirm('此操作将删除所选内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dalete([row])
      }).catch(() => {})
    },
    // 工具栏删除
    Bardelete () {
      if (this.TableSelect.length > 0) {
        this.$confirm('此操作将删除所选内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dalete(this.TableSelect)
        }).catch(() => {})
      } else {
        this.$notify({
          title: '提示',
          message: '请选中后删除',
          duration: 2000,
          type: 'error'
        })
      }
    },
    // 工具栏编辑
    BarEdit () {
      if (this.TableSelect.length === 1) {
        this.AppEdit(null, this.TableSelect[0])
        this.dialogVisible = true
        this.Isedit = true
      } else {
        this.$notify({
          title: '提示',
          message: '请选中一行后编辑',
          duration: 2000,
          type: 'error'
        })
      }
    },
    // 表格选中
    SelectedChange (selection) {
      this.TableSelect = selection
    },
    // 重置
    reset () {
      this.$refs.QueryForm.resetFields()
      this.$refs.Page.refresh()
    },
    // 清除dialog表单
    resetdialog () {
      this.$refs.ruleForm.resetFields()
      this.$refs.ruleForm.clearValidate()
    },
    // 表单提交
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.Isedit) {
            this.update()
          } else { this.Add() }
        } else {
          return false
        }
      })
    },
    // 添加方法
    Add () {
      this.$refs.Page.add(JSON.parse(JSON.stringify(this.ruleForm)))
      this.dialogVisible = false
    },
    // 更新方法
    update () {
      this.$refs.Page.edit(JSON.parse(JSON.stringify(this.ruleForm)))
      this.dialogVisible = false
    },
    // 删除方法
    dalete (data) {
      this.$refs.Page.dalete(JSON.parse(JSON.stringify(data)))
    }
  }
}
</script>
