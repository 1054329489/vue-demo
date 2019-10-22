<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm" style="width: 50%; margin:0 auto;">
    <el-form-item label="Cusip" prop="cusip">
      <el-select v-model="ruleForm.cusip" placeholder="choose the cusip" value="" :clearable="true" style="width: 100%">
        <el-option
          v-for="item in cusip"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Seller" prop="sId">
      <el-select v-model="ruleForm.sId" placeholder="choose your name" value="" :clearable="true" style="width: 100%">
        <el-option
          v-for="item in seller"
          :key="item.sId"
          :label="item.sName"
          :value="item.sId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Client" prop="cId">
      <el-select v-model="ruleForm.cId" placeholder="choose your client name" value="" :clearable="true"
                 style="width: 100%">
        <el-option
          v-for="item in client"
          :key="item.cId"
          :label="item.cName"
          :value="item.cId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input v-model.number="ruleForm.price" placeholder="please input the price"></el-input>
    </el-form-item>
    <el-form-item label="Notional Amount" prop="notionalAmount">
      <el-input v-model.number="ruleForm.notionalAmount" placeholder="please input the amount"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
      <el-button @click="resetForm('ruleForm')">reset</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      cusip: [],
      seller: [],
      client: [],
      ruleForm: {
        cusip: '',
        sId: '',
        cId: '',
        price: '',
        notionalAmount: '',
        status: 'REQUESTED',
        interVNum: 1,
        interId: 'SW1',
        txn_id: 11111
      },
      rules: {
        cusip: [
          {required: true, message: 'please choose a product', trigger: 'change'}
        ],
        sId: [
          {type: 'date', required: true, message: 'please choose your name', trigger: 'change'}
        ],
        cId: [
          {type: 'date', required: true, message: 'please choose a client', trigger: 'change'}
        ],
        notionalAmount: [
          {required: true, message: 'please input the notional amount', trigger: 'blur'},
          {type: 'number', message: 'not a number', trigger: 'blur'}
        ],
        price: [
          {required: true, message: 'please input a price', trigger: 'blur'},
          {type: 'number', message: 'not a number', trigger: 'blur'}
        ]
      }
    }
  },
  beforeCreate () {
    this.$nextTick(function () {
      let _this = this
      this.$http.get('/all-cusip').then(res => {
        _this.cusip = res.data
        // console.log(res)
      })
      this.$http.get('/all-seller').then(res => {
        _this.seller = res.data
        // console.log(res)
      })
      this.$http.get('/all-client').then(res => {
        _this.client = res.data
        // console.log(res)
      })
    })
  },
  methods: {
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(JSON.stringify(_this.ruleForm))
          _this.$http.post('/sales-leg', JSON.stringify(_this.ruleForm)).then(res => {
            console.log(res)
          })
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
