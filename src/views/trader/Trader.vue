<template>
  <div class="container">
    <el-table
      :data="traderLeg"
      style="width: 100%"
      border>
      <el-table-column
        prop="interVNum"
        label="version"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sId"
        label="sellerId"
        width="180">
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
      <el-table-column
        label="option">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">History
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleMatch(scope.$index, scope.row)">Match
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="traderLeg history"
      :visible.sync="dialogVisible"
      width="50%"
      center>
      <el-table
        :data="traderLegHistory"
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
<!--        <el-table-column-->
<!--          label="option">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              @click="handleForceMatch(scope.$index, scope.row)">match-->
<!--            </el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">cancel</el-button>-->
    <el-button type="primary" @click="dialogVisible = false">ok</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        traderLeg: [],
        traderLegHistory: [],
        salesLeg: [],
        allTraderLeg: [],
        chosenTraderLeg: {},
        chosenSalesLeg: {}
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        let _this = this
        this.$http.get('/trader-leg').then(res => {
          _this.allTraderLeg = res.data
          console.log(_this.allTraderLeg)
          _this.allTraderLeg.map(function (obj, index, input) {
            if (index === 0) {
            } else if (index === input.length - 1) {
              if (obj.status === 'PENDING') {
                _this.traderLeg.push(obj)
              }
            } else {
              if (obj.txnId !== input[index + 1].txnId) {
                if (obj.status === 'PENDING') {
                  _this.traderLeg.push(obj)
                }
              }
            }
            return obj
          })
        })
      })
    },
    methods: {
      handleMatch (index, rowData) {
        let _this = this
        _this.dialogVisible = true
        _this.chosenTraderLeg = rowData
        _this.$http.get('/sales-leg').then(res => {
          //user clicked one traderLeg row
          //then click another, we need clear the salesLeg array
          _this.salesLeg = []
          res.data.map(function (obj) {
            if (obj.status === 'PENDING') {
              _this.salesLeg.push(obj)
            }
          })
        })
      },
      handleEdit (index, rowData) {
        let _this = this
        _this.dialogVisible = true
        console.log(rowData.txnId)
        _this.$http.post('/tw-txn-history', rowData.txnId).then(res =>{
          _this.traderLegHistory = res.data
        })
      },
      handleForceMatch (index, rowData) {
        let _this = this
        _this.chosenSalesLeg = rowData
        alert(_this.chosenSalesLeg.txnId + '  ' + _this.chosenTraderLeg.txnId)
        _this.dialogVisible = false
      }
    }
  }
</script>
<style>
  .container {
    min-height: 100vh;
    align-items: center;
    background-image: url(../login/images/login_body.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;

  }
</style>
