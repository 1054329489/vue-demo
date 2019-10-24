<template>
  <div>
    <el-table
      :data="traderLeg"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="TXN ID">
              <span>{{ props.row.matchedSellerLeg }}</span>
            </el-form-item>
            <el-form-item label="Version">
              <span>{{ props.row.interVNum }}</span>
            </el-form-item>
            <el-form-item label="Seller">
              <span>{{ props.row.sId }}</span>
            </el-form-item>
            <el-form-item label="ClientId">
              <span>{{ props.row.cId }}</span>
            </el-form-item>
            <el-form-item label="Cusip">
              <span>{{ props.row.cusip }}</span>
            </el-form-item>
            <el-form-item label="Status">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item label="Price">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="Amount">
              <span>{{ props.row.notionalAmount }}</span>
            </el-form-item>
            <el-form-item label="option">
              <!--              <template slot-scope="scope">-->
              <el-button
                size="mini"
                @click="handleHistory(props.row.matchedSellerLeg)">History
              </el-button>
              <!--              </template>-->
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="Txn txnId"
        prop="txnId">
      </el-table-column>
      <el-table-column
        label="Version"
        prop="interVNum">
      </el-table-column>
      <el-table-column
        label="Cusip"
        prop="cusip">
      </el-table-column>
      <el-table-column
        label="status"
        prop="status">
      </el-table-column>
      <el-table-column
        label="NotionalAmount"
        prop="notionalAmount">
      </el-table-column>
      <el-table-column
        label="Price"
        prop="price">
      </el-table-column>
      <el-table-column
        prop="sId"
        label="sellerId">
      </el-table-column>
      <el-table-column
        label="option" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleTraderHistory(scope.$index, scope.row)">History
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="History"
      :visible.sync="dialogVisible"
      width="50%"
      center>
      <el-table
        :data="salesLegHistory"
        style="width: 100%"
        border>
        <el-table-column
          prop="interVNum"
          label="version"
        >
        </el-table-column>
        <el-table-column
          prop="sId"
          label="sellerId"
        >
        </el-table-column>
        <el-table-column
          prop="cId"
          label="clientId"
          v-if="showClient"
        >
        </el-table-column>
        <el-table-column
          prop="cusip"
          label="cusip">
        </el-table-column>
        <el-table-column
          prop="price"
          label="price">
        </el-table-column>
        <el-table-column
          prop="notionalAmount"
          label="amount">
        </el-table-column>
        <el-table-column
          prop="status"
          label="status">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">ok</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="add new traderLeg"
      :visible.sync="editDialogVisible"
      width="50%"
      center
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm"
               style="width: 100%; margin:0 auto;">
        <el-form-item label="Cusip" prop="cusip">
          <el-select disabled v-model="ruleForm.cusip" placeholder="choose the cusip" value=""
                     :clearable="true"
                     style="width: 100%">
          </el-select>
        </el-form-item>
        <el-form-item label="SellerId" prop="sId">
          <el-select disabled v-model="ruleForm.sId" placeholder="choose your name" value=""
                     :clearable="true"
                     style="width: 100%">
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
          <el-button type="primary" @click="editDialogVisible = false">cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data () {
      return {
        traderLeg: [],
        salesLeg: [],
        ruleForm: {
          cusip: '',
          sId: '',
          price: '',
          notionalAmount: ''
        },
        salesLegHistory: [],
        traderLegHistory: [],
        showClient: false,
        dialogVisible: false,
        editDialogVisible: false,
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
      let _this = this
      _this.$http.get('/newest-sales-leg').then(res1 => {
        _this.salesLeg = res1.data
        console.log(res1.data)
        _this.$http.get('/newest-trader-leg').then(res => {
          _this.traderLeg = []
          console.log(res.data)
          res.data.map(function (obj) {
            if (obj.matchedSellerLeg !== null && obj.matchedSellerLeg !== undefined) {
              console.log(obj.matchedSellerLeg)
              _this.salesLeg.map(function (salesLeg) {
                if (salesLeg.txnId === obj.matchedSellerLeg) {
                  obj.cId = salesLeg.cId
                }
              })
              _this.traderLeg.push(obj)
            }
          })
        })
        // console.log(_this.traderLeg)
      })
    },
    methods: {
      handleTraderHistory (index, rowData) {
        let _this = this
        _this.dialogVisible = true
        _this.showClient = false
        console.log(rowData.txnId)
        _this.$http.post('/tw-txn-history', rowData.txnId).then(res => {
          _this.salesLegHistory = res.data
          console.log(res.data)
        })
      },
      handleHistory (rowData) {
        let _this = this
        console.log(rowData)
        _this.dialogVisible = true
        _this.showClient = true
        _this.$http.post('/sw-txn-history', rowData).then(res => {
          console.log(res)
          _this.salesLegHistory = res.data
        })
      },
      handleEdit (index, rowData) {
        let _this = this
        _this.editDialogVisible = true
        _this.ruleForm = rowData
      },
      submitForm (formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(_this.ruleForm))
            _this.ruleForm.status = 'PENDING'
            _this.ruleForm.interVNum = _this.ruleForm.interVNum + 1
            _this.ruleForm.interId = 'TW' + _this.ruleForm.interVNum
            _this.$http.post('/matched-trader-leg', _this.ruleForm).then(res => {
              _this.editDialogVisible = false
              // console.log(res)
              alert('submit success!')
              //refresh the data
              _this.$http.get('/newest-sales-leg').then(res1 => {
                _this.salesLeg = res1.data
                console.log(res1.data)
                _this.$http.get('/newest-trader-leg').then(res => {
                  _this.traderLeg = []
                  console.log(res.data)
                  res.data.map(function (obj) {
                    if (obj.matchedSellerLeg !== null && obj.matchedSellerLeg !== undefined) {
                      console.log(obj.matchedSellerLeg)
                      _this.salesLeg.map(function (salesLeg) {
                        if (salesLeg.txnId === obj.matchedSellerLeg) {
                          obj.cId = salesLeg.cId
                        }
                      })
                      _this.traderLeg.push(obj)
                    }
                  })
                })
                // console.log(_this.traderLeg)
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
