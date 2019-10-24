<template>
  <div class="container">
    <div class="formWrapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm"
               style="width: 50%; margin:0 auto;">
        <el-form-item label="Cusip" prop="cusip">
          <el-select v-model="ruleForm.cusip" placeholder="choose the cusip" value="" :clearable="true"
                     style="width: 100%">
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
    </div>
  </div>
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
          price: '',
          notionalAmount: '',
          status: 'REQUESTED',
          interVNum: 1,
          interId: 'TW1',
        },
        rules: {
          cusip: [
            {required: true, message: 'please choose a product', trigger: 'change'}
          ],
          sId: [
            {type: 'date', required: true, message: 'please choose your name', trigger: 'change'}
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
      })
    },
    methods: {
      submitForm (formName) {
        let _this = this
        _this.$router.replace('/pendingLeg')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(JSON.stringify(_this.ruleForm))

            _this.$http.post('/trader-leg', _this.ruleForm).then(res => {
              console.log(res)
              let dir = res.data
              if(dir===1){
                _this.$router.replace('/pendingLeg')
              }else {
                _this.$router.replace('/matchedLeg')
              }
              _this.$message.success('submit success!')
            })
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
<style>
  . container{
    display: flex;
  }
  .contentWrapper{
    flex: 1;
  }

  .mainHeader{
    height: 56px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .userCenter{
    display: flex;
    align-items: center;
  }
  .userCenter .username{
    margin-right: 15px;
    bottom: 10px;
    position:relative;
  }
  .citiLogo{
    position: center;
  }
  .formWrapper{
    margin-top: 50px;
  }

</style>
