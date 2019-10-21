<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm" style="width: 50%" align="center">
    <el-form-item label="Cusip" prop="cusip">
      <el-select v-model="ruleForm.cusip" placeholder="choose the cusip" value="" clearable="true" style="width: 100%">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Seller" prop="seller">
      <el-select v-model="ruleForm.seller" placeholder="choose your name" value="" clearable="true" style="width: 100%">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Client" prop="client">
      <el-select v-model="ruleForm.client" placeholder="choose your client name" value="" clearable="true" style="width: 100%">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input v-model="ruleForm.price"></el-input>
    </el-form-item>
    <el-form-item label="Notional Amount" prop="amount">
      <el-input v-model="ruleForm.amount"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
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
          {required: true, message: 'please input the notional amount', trigger: 'blur'}
        ],
        price: [
          {required: true, message: 'please input a price', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
