<template>
  <div class="firstMes">
    <Form ref="searchForm" :model="searchForm" inline :label-width="80">
      <FormItem label="项目名">
        <Input v-model="searchForm.projectName"/>
      </FormItem>
      <FormItem label="品名">
        <Input v-model="searchForm.productName"/>
      </FormItem>
      <FormItem label="模具号">
        <Input v-model="searchForm.modelNum"/>
      </FormItem>
      <FormItem label="穴号">
        <Input v-model="searchForm.pointNum"/>
      </FormItem>
      <FormItem label="机台">
        <Input v-model="searchForm.machine"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>
    <Table border ref="firstMes" @on-selection-change="onSelectChange" :loading="loading" :show-header="showhead" :columns="columns7" :data="data6"></Table>
    <Divider />
    <Button icon='md-lock' :disabled=btndisabled @click="freeze" type="warning">批量冻结</Button>
    <Button icon='md-key' :disabled=btndisabled @click="unfreeze" type="info">批量解冻</Button>
    <Button icon='md-trash' :disabled=btndisabled @click="discard" type="error">批量报废</Button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchForm: {
        projectName: '',
        productName: '',
        modelNum: '',
        pointNum: '',
        machine: ''
      },
      multipleSelection: [],
      btndisabled: true,
      loading: false,
      showhead: true,
      columns7: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'Name',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                },
                'View'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                },
                'Delete'
              )
            ])
          }
        }
      ],
      data6: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    onSelectChange (selections) {
      this.multipleSelection = selections
      if (selections.length === 0) {
        this.btndisabled = true
      } else {
        this.btndisabled = false
      }
    },
    freeze () {
      alert('freeze')
    },
    unfreeze () {
      alert('unfreeze')
    },
    discard () {
      alert('discard')
    }
  }
}
</script>
<style scoped>
.firstMes {
  width: 96%;
  padding-left: 2%;
}
</style>
