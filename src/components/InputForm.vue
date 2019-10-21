<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm" style="width: 50%; margin:0 auto;">
    <el-form-item label="Cusip" prop="cusip">
      <el-select v-model="ruleForm.cusip" placeholder="choose the cusip" value="" :clearable="true" style="width: 100%">
        <el-option
          v-for="item in cusip"
          :key="item.cusip"
          :label="item.cusip"
          :value="item.cusip">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Seller" prop="seller">
      <el-select v-model="ruleForm.seller" placeholder="choose your name" value="" :clearable="true" style="width: 100%">
        <el-option
          v-for="item in seller"
          :key="item.sId"
          :label="item.sName"
          :value="item.sId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Client" prop="client">
      <el-select v-model="ruleForm.client" placeholder="choose your client name" value="" :clearable="true"
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
      <el-input v-model.number="ruleForm.price"></el-input>
    </el-form-item>
    <el-form-item label="Notional Amount" prop="amount">
      <el-input v-model.number="ruleForm.amount"></el-input>
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
        seller: '',
        client: '',
        price: '',
        amount: ''
      },
      rules: {
        cusip: [
          {required: true, message: 'please choose a product', trigger: 'change'}
        ],
        seller: [
          {type: 'date', required: true, message: 'please choose your name', trigger: 'change'}
        ],
        client: [
          {type: 'date', required: true, message: 'please choose a client', trigger: 'change'}
        ],
        amount: [
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
      this.$http.get('/allCusip').then(res => {
        _this.cusip = res.data.posts
      })
      this.$http.get('/allSeller').then(res => {
        _this.seller = res.data.posts
      })
      this.$http.get('/allClient').then(res => {
        _this.client = res.data.posts
      })
    })
  },
  methods: {
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(_this.ruleForm)
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
