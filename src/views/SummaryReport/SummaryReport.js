import React, { Component } from 'react'
import Select  from 'react-select'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  Table,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Input,
} from 'reactstrap'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

import { 
  Doughnut,
  Bar,
  Line
} from 'react-chartjs-2';

// import functions
import { callAPI, downloadCSV} from '../../functions/api.js'

import moment from 'moment'

class SummaryReport extends Component {
  constructor(props) {
    super(props)

    this.SummaryReportURL = SERVICE_DWHBRANCH_URL
    this.downloadURL = SERVICE_DOWNLOAD_URL

    this.state = {
        options_kanwil : [],
        options_cabang : [],
        options_unit : [],
        kanwil : '',
        cabang: '',
        unit: '',
        id_kanwil: '',
        id_cabang: 0,
        id_unit: 0,
        valueKanwil: {label: 'Pilih Kanwil', value: ''},
        valueCabang: {label: 'Pilih Cabang', value: 0},
        valueUnit: {label: 'Pilih Unit', value: 0},
        
        startMonth: moment().endOf('day').add(-11,'M'),
        endMonth: moment().endOf('day').add(-1,'M'),

        // grafik
        label_produk: [],
        label_fasrek: [],
        label_segmentasi: [],
        label_nasabah_keluar: [],
        label_ratas_saldo: [],
        label_posisi_saldo: [],
        label_frek_merchant: [],
        label_nom_merchant: [],

        data_produk: [],
        data_fasrek: {
          aktif: [],
          tidak_aktif: []
        },
        data_segmentasi: [],
        data_nasabah_keluar: [],
        data_ratas_saldo: [],
        data_posisi_saldo: [],
        data_frek_merchant: [],
        data_nom_merchant: [],
        data_posisi_saldo_rata_rata: [],
        data_posisi_saldo_saat_ini: [],

        modif_date_produk: "",
        modif_date_fasrek: "",
        modif_date_segmentasi: "",
        modif_date_nasabah_keluar: "",
        modif_date_ratas_saldo: "",
        modif_date_posisi_saldo: "",
        modif_date_frek_merchant:"",
        modif_date_nom_merchant: "",

        period_date_produk: [],
        period_date_fasrek: [],
        period_date_segmentasi: [],
        period_date_nasabah_keluar: [],
        period_date_ratas_saldo: [],
        period_date_posisi_saldo: [],
        period_date_frek_merchant: [],
        period_date_nom_merchant: [],

        months : {
          "01": 'January',
          "02": 'February',
          "03": 'March',
          "04": 'April',
          "05": 'May',
          "06": 'June',
          "07": 'July',
          "08": 'August',
          "09": 'September',
          "10": 'October',
          "11": 'November',
          "12": 'December'
        },
    }
    this.options = {
      // tooltips: {
      //     callbacks: {
      //       title: function(tooltipItem, data){
      //         return data.datasets[tooltipItem[0].datasetIndex].titles[tooltipItem[0].index];
      //       },
      //       beforeLabel: function(tooltipItem, data) {
      //         var label = ' No Rekening: '+data.datasets[tooltipItem.datasetIndex].accounts[tooltipItem.index]+ '\n';
      //         return label;
      //       },
      //       label: function(tooltipItem, data) {
      //           var label = ' '+data.datasets[tooltipItem.datasetIndex].label+": "+"Rp. " + parseInt(tooltipItem.yLabel).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      //           return label;
      //       }
      //     }
      // },
      legend: {
        display: false,
      },
      maintainAspectRatio: true,
      scales: {
          yAxes: [{
              ticks: {
                  // Include a dollar sign in the ticks
                  // callback: function(value, index, values) {
                  //     return 'Rp ' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                  // },
                  suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                  // OR //
                  beginAtZero: true   // minimum value will be 0.
              }
            }],
            xAxes: [{
              ticks: {
                autoSkip: false,
              }
            }]
          
      },
    }
    
    this.handleKanwilChange = this.handleKanwilChange.bind(this)
    this.handleCabangChange = this.handleCabangChange.bind(this)
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.loadKanwil = this.loadKanwil.bind(this)
    this.loadCabang = this.loadCabang.bind(this)
    this.loadUnit = this.loadUnit.bind(this)

    this.disabledStartMonth = this.disabledStartMonth.bind(this)
    this.disabledEndMonth = this.disabledEndMonth.bind(this)
    this.onChangeStartMonth = this.onChangeStartMonth.bind(this)
    this.onChangeEndMonth = this.onChangeEndMonth.bind(this)
    // Filter
    this.handleFilter = this.handleFilter.bind(this)
    this.FilterBranch = this.FilterBranch.bind(this)
    // Grafik
    // this.loadPortofolio = this.loadPortofolio.bind(this)
    // this.loadFiturFasrek = this.loadFiturFasrek.bind(this)
    // this.loadSegmentasi = this.loadSegmentasi.bind(this)
    // this.loadPosisiSaldo = this.loadPosisiSaldo.bind(this)
    // this.loadNasabahKeluar = this.loadNasabahKeluar.bind(this)
    // this.loadRatasSaldo = this.loadRatasSaldo.bind(this)
    // this.loadFrekuensiMerchant = this.loadFreqMerchant.bind(this)
    // this.loadNominalMerchant = this.loadNominalMerchant.bind(this)

    // Download
    this.downloadCSV = this.downloadCSV.bind(this)
  }

  componentDidMount() {
    this.FilterBranch()
    this.loadPortofolio()
    this.loadFiturFasrek()
    this.loadSegmentasi()
    this.loadNasabahKeluar()
    this.loadPosisiSaldo()
    this.loadRatasSaldo()
    this.loadFrekuensiMerchant()
    this.loadNominalMerchant()
  }

  FilterBranch() {
    callAPI(this.SummaryReportURL+'dwh-branch/filter', (response) => {

      var kanwil = []
      var cabang = []
      var unit = []

      for (let index = 0; index < response.data.length; index++) {
        var temp = {
          value : '',
          label : ''
        }
        if (this.state.id_cabang != 0){
          temp.value = response.data[index].branch;
          temp.label = response.data[index].brdesc;
          unit.push(temp);
        }else if (this.state.id_kanwil != ''){
          temp.value = response.data[index].mainbr;
          temp.label = response.data[index].mbdesc;
          cabang.push(temp);
        }else if (this.state.id_kanwil == ''){
          temp.value = response.data[index].region;
          temp.label = response.data[index].rgdesc;
          kanwil.push(temp);
        }
      }
      if (this.state.id_cabang != 0){
        this.setState({
          options_unit : unit
        })
      }else if (this.state.id_kanwil != ''){
        this.setState({
          options_cabang : cabang
        })
      }else if (this.state.id_kanwil == ''){
        this.setState({
          options_kanwil : kanwil
        })
        console.log(kanwil);
      }

    }, "POST", JSON.stringify({
      region: this.state.id_kanwil,
      mainbr: this.state.id_cabang
    })
    )
  }

  loadKanwil() {
    callAPI(this.SummaryReportURL+'dwh-branch/kanwil', (response) => {
      var kanwil = []
      for (let index = 0; index < response.data.length; index++) {
        var temp = {
          value : '',
          label : ''
        }
        temp.value = response.data[index];
        temp.label = response.data[index];
        kanwil.push(temp);
        
      }

      this.setState({
        options_kanwil : kanwil
      })

    }, "GET", JSON.stringify({
    })
    )
    
  }

  loadCabang() {
    callAPI(this.SummaryReportURL+'dwh-branch/cabang', (response) => {
      var cabang = []
      for (let index = 0; index < response.data.length; index++) {
        var temp = {
          value : '',
          label : ''
        }
        temp.value = response.data[index];
        temp.label = response.data[index];
        cabang.push(temp);
        
      }

      this.setState({
        options_cabang : cabang,
      })

    }, "POST", JSON.stringify({
      rgdesc : this.state.kanwil
    })
    )
  }

  loadUnit() {
    callAPI(this.SummaryReportURL+'dwh-branch/unit', (response) => {
      var unit = []
      for (let index = 0; index < response.data.length; index++) {
        var temp = {
          value : '',
          label : ''
        }
        temp.value = response.data[index];
        temp.label = response.data[index];
        unit.push(temp);
        
      }

      this.setState({
        options_unit : unit
      })

    }, "POST", JSON.stringify({
      rgdesc : this.state.kanwil,
      mbdesc : this.state.cabang
    })
    )
  }

  
  handleKanwilChange(selected){
    console.log(selected)
    this.setState({ 
        kanwil : selected.value,
        id_kanwil : selected.value,
        id_cabang : 0,
        valueKanwil : selected,
        valueCabang : {label: 'Pilih Cabang', value: ''},
        valueUnit : {label: 'Pilih Unit', value:''},
        options_unit : []
    }, () => this.FilterBranch())
  }

  handleCabangChange(selected){
    this.setState({
      cabang : selected.value,
      id_cabang : selected.value,
      valueCabang : selected,
      valueUnit : {label: 'Pilih Unit', value:0}
    }, () => this.FilterBranch())
  }

  handleUnitChange(selected){
    this.setState({
      unit : selected.value,
      valueUnit : selected
    })
  }

  onChangeStartMonth(value){
   this.setState({
    startMonth : value,
    endMonth : null
   })
  }

  onChangeEndMonth(value){
    this.setState({
      endMonth : value
     })
  }

  disabledStartMonth(current) {
    // Can not select days before today and today
    return current < moment().endOf('day').add(-12, 'M') && current > moment().endOf('day');
  }

  disabledEndMonth(current){
    // console.log(this.state.startMonth)
      console.log('current')
      console.log(current)
    return current < moment().endOf('day').add(-5,'M') && current > moment().endOf('day');
  }

  //Filter
  handleFilter(){
    console.log("filter")
    this.loadPortofolio()
    this.loadFiturFasrek()
    this.loadSegmentasi()
    this.loadPosisiSaldo()
    this.loadNasabahKeluar()
    this.loadRatasSaldo()
    this.loadFreqMerchant()
    this.loadNominalMerchant()
  }




  loadPortofolio(){
    console.log('load portofolio')
    callAPI('https://jsonplaceholder.typicode.com/posts', (response) => {
      // // 'bri360/summary-dashboard/top-produk'
      // 'http://127.0.0.1:8260/bri360/churn-analysis/churn'
      console.log(response)
      // var items = response
      // var exp = items.map(a => a.id)
      // var response = {
      //   "status" : 200,
      //   "data" : {
      //     "Britama" : 700, 
      //     "Simpedes": 900,
      //     "Briguna": 800,
      //     "Junio" : 600
      //   },
      //   "period_date": ["201803","201902"],
      //   "modified_date": "2019-12-16 14:23:45"
      // }

      var periode_date = ""
      if (response.period_date.length == 2){
        var year_start_period = response.period_date[0].substr(0,4)
        var year_end_period = response.period_date[1].substr(0,4)
        if (year_start_period == year_end_period){
          periode_date = this.state.months[response.period_date[0].substr(4)]+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }else{
          periode_date = this.state.months[response.period_date[0].substr(4)]+' '+year_start_period+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }
      }

      this.setState({
        label_produk : Object.keys(response.data),
        data_produk: Object.values(response.data),
        modif_date_produk: moment(response.modified_date).format("DD MMMM YYYY HH:mm:ss"),
        period_date_produk: periode_date
      })

    }, "POST", JSON.stringify({
      start_date : this.state.startMonth.format('YYYYMM').toString(),
      end_date : this.state.endMonth.format('YYYYMM').toString(),
      branch: this.state.id_unit.toString(),
      mainbr: this.state.id_cabang.toString(),
      region: this.state.id_kanwil
    })
    )
  }

  loadFiturFasrek(){
    console.log('load fitur fasrek')
     callAPI(this.SummaryReportURL+'bri360/summary-dashboard/fasilitas-rekening', (response) => {

      // var response = {
      //   "status" : 200,
      //   "data" : {
      //     'reg_sms':{
      //       'aktif': 80,
      //       'tidak_aktif': 20
      //     },
      //     'sms_fin':{
      //       'aktif': 70,
      //       'tidak_aktif': 30
      //     },
      //     'prioritas':{
      //       'aktif': 50,
      //       'tidak_aktif': 50
      //     },
      //   },
      //   "period_date": ["201801","201902"],
      //   "modified_date": "2019-12-16 14:23:45"
      // }

      var periode_date = ""
      if (response.period_date.length == 2){
        var year_start_period = response.period_date[0].substr(0,4)
        var year_end_period = response.period_date[1].substr(0,4)
        if (year_start_period == year_end_period){
          periode_date = this.state.months[response.period_date[0].substr(4)]+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }else{
          periode_date = this.state.months[response.period_date[0].substr(4)]+' '+year_start_period+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }
      }

      var data_fasrek = {
        aktif: [],
        tidak_aktif: []
      }
      for (var key in response.data){
        data_fasrek["aktif"].push(response.data[key]["aktif"])
        data_fasrek["tidak_aktif"].push(response.data[key]["tidak_aktif"])
      }

      this.setState({
        label_fasrek : Object.keys(response.data),
        data_fasrek: data_fasrek,
        modif_date_fasrek: moment(response.modified_date).format("DD MMMM YYYY HH:mm:ss"),
        period_date_fasrek: periode_date
      })

    }, "POST", JSON.stringify({
      start_date : this.state.startMonth.format('YYYYMM').toString(),
      end_date : this.state.endMonth.format('YYYYMM').toString(),
      branch: this.state.id_unit.toString(),
      mainbr: this.state.id_cabang.toString(),
      region: this.state.id_kanwil
    })
    )
  }

  loadSegmentasi(){
    console.log('load segmentasi')
    callAPI(this.SummaryReportURL+'bri360/summary-dashboard/segmentasi', (response) => {

      // var response = {
      //   "status" : 200,
      //   "data" : {
      //     "Generator" : 1000, 
      //     "Leaker" : 600,
      //     "Not_Segmented": 500,
      //     "Passer": 145,
      //     "Saver_Active": 800,
      //     "Saver_Passive": 900,
      //   },
      //   "period_date": ["201901","201902"],
      //   "modified_date": "2019-12-16 14:23:45"
      // }

      var periode_date = ""
      if (response.period_date.length == 2){
        var year_start_period = response.period_date[0].substr(0,4)
        var year_end_period = response.period_date[1].substr(0,4)
        if (year_start_period == year_end_period){
          periode_date = this.state.months[response.period_date[0].substr(4)]+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }else{
          periode_date = this.state.months[response.period_date[0].substr(4)]+' '+year_start_period+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }
      }

      this.setState({
        label_segmentasi : Object.keys(response.data),
        data_segmentasi: Object.values(response.data),
        modif_date_segmentasi: moment(response.modified_date).format("DD MMMM YYYY HH:mm:ss"),
        period_date_segmentasi: periode_date
      })

    }, "POST", JSON.stringify({
      start_date : this.state.startMonth.format('YYYYMM').toString(),
      end_date : this.state.endMonth.format('YYYYMM').toString(),
      branch: this.state.id_unit.toString(),
      mainbr: this.state.id_cabang.toString(),
      region: this.state.id_kanwil
    })
    )
  }

  loadPosisiSaldo(){
    // NOTE: posisi saldo belum
    console.log('load posisi saldo')
    callAPI(this.SummaryReportURL+'bri360/summary-dashboard/posisi-saldo', (response) => {
    // var response = {  
    //     "status" : 200,
    //     "data" : {
    //         "saldo_rata_rata" : { "201901" : 12, "201902":34, "201903" : 76, "201904":98,  "201905" : 27, "201906":47 },
    //         "saldo_saat_ini" : { "201901" : 46, "201902":68, "201903" : 25, "201904":70,  "201905" : 47, "201906":80 }
    //       },
    //     "period_date": ["201901", "201902"],
    //     "modified_date": "2019-02-16 14:23:45"
    //     }
    // console.log(response)
    
    var periode_date = ""
    if (response.period_date.length == 2){
      var year_start_period = response.period_date[0].substr(0,4)
      var year_end_period = response.period_date[1].substr(0,4)
      if (year_start_period == year_end_period){
        periode_date = this.state.months[response.period_date[0].substr(4)]+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
      }else{
        periode_date = this.state.months[response.period_date[0].substr(4)]+' '+year_start_period+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
      }
    }

    this.setState({
      modif_date_posisi_saldo: moment(response.modified_date).format("DD MMMM YYYY HH:mm:ss"),
      period_date_posisi_saldo: periode_date,
      label_posisi_saldo: Object.keys(response.data.saldo_rata_rata),
      data_posisi_saldo_rata_rata: Object.values(response.data.saldo_rata_rata),
      data_posisi_saldo_saat_ini: Object.values(response.data.saldo_saat_ini)
    })
    // console.log(this.state.data_posisi_saldo_rata_rata)
    // console.log(this.state.data_posisi_saldo_saat_ini)
  }, "POST", JSON.stringify({
    start_date : this.state.startMonth.format('YYYYMM').toString(),
    end_date : this.state.endMonth.format('YYYYMM').toString(),
    branch: this.state.id_unit.toString(),
    mainbr: this.state.id_cabang.toString(),
    region: this.state.id_kanwil
  })
  )
  }


  loadNasabahKeluar(){
    console.log('load nasabah keluar')
    callAPI(this.SummaryReportURL+'bri360/summary-dashboard/churn', (response) => {

      var response = {
        "status" : 200,
        "data" : {
          "High" : 1000, 
          "Medium" : 600,
          "Low": 500
        },
        "period_date": ["201901","201902"],
        "modified_date": "2019-12-16 14:23:45"
      }

      var periode_date = ""
      if (response.period_date.length == 2){
        var year_start_period = response.period_date[0].substr(0,4)
        var year_end_period = response.period_date[1].substr(0,4)
        if (year_start_period == year_end_period){
          periode_date = this.state.months[response.period_date[0].substr(4)]+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }else{
          periode_date = this.state.months[response.period_date[0].substr(4)]+' '+year_start_period+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }
      }

      this.setState({
        label_nasabah_keluar : Object.keys(response.data),
        data_nasabah_keluar: Object.values(response.data),
        modif_date_nasabah_keluar: moment(response.modified_date).format("DD MMMM YYYY HH:mm:ss"),
        period_date_nasabah_keluar: periode_date
      })

      console.log(Object.values(response.data))
    }, "POST", JSON.stringify({
      start_date : this.state.startMonth.format('YYYYMM').toString(),
      end_date : this.state.endMonth.format('YYYYMM').toString(),
      branch: this.state.id_unit.toString(),
      mainbr: this.state.id_cabang.toString(),
      region: this.state.id_kanwil
    })
    )
  }
  loadRatasSaldo(){
    console.log('load ratas saldo')
      callAPI(this.SummaryReportURL+'bri360/summary-dashboard/prediksi-ratas-saldo', (response) => {

        // var response = {
        //   "status" : 200,
        //   "data" : {
        //     "Naik" : 1000, 
        //     "Turun" : 600
        //   },
        //   "period_date": ["201901","201902"],
        //   "modified_date": "2019-12-16 14:23:45"
        // }
  
        var periode_date = ""
        if (response.period_date.length == 2){
          var year_start_period = response.period_date[0].substr(0,4)
          var year_end_period = response.period_date[1].substr(0,4)
          if (year_start_period == year_end_period){
            periode_date = this.state.months[response.period_date[0].substr(4)]+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
          }else{
            periode_date = this.state.months[response.period_date[0].substr(4)]+' '+year_start_period+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
          }
        }
  
        this.setState({
          label_ratas_saldo : Object.keys(response.data),
          data_ratas_saldo: Object.values(response.data),
          modif_date_ratas_saldo: moment(response.modified_date).format("DD MMMM YYYY HH:mm:ss"),
          period_date_ratas_saldo: periode_date
        })
  
      }, "POST", JSON.stringify({
        start_date : this.state.startMonth.format('YYYYMM').toString(),
        end_date : this.state.endMonth.format('YYYYMM').toString(),
        branch: this.state.id_unit.toString(),
        mainbr: this.state.id_cabang.toString(),
        region: this.state.id_kanwil
      })
      )
  }
  loadFrekuensiMerchant(){
    console.log('load frekuensi merchant')
    callAPI(this.SummaryReportURL+'bri360/summary-dashboard/top-frekuensi-merchant', (response) => {

      // var response = {
      //   "status" : 200,
      //   "data" : {
      //     "Tokopedia" : 1000, 
      //     "Shopee" : 600,
      //     "Bukalapak" : 500,
      //     "Alfamart" : 356,
      //     "Traveloka" : 346
      //   },
      //   "period_date": ["201901","201902"],
      //   "modified_date": "2019-12-16 14:23:45"
      // }

      var periode_date = ""
      if (response.period_date.length == 2){
        var year_start_period = response.period_date[0].substr(0,4)
        var year_end_period = response.period_date[1].substr(0,4)
        if (year_start_period == year_end_period){
          periode_date = this.state.months[response.period_date[0].substr(4)]+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }else{
          periode_date = this.state.months[response.period_date[0].substr(4)]+' '+year_start_period+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
        }
      }

      this.setState({
        label_frek_merchant : Object.keys(response.data),
        data_frek_merchant: Object.values(response.data),
        modif_date_frek_merchant: moment(response.modified_date).format("DD MMMM YYYY HH:mm:ss"),
        period_date_frek_merchant: periode_date
      })

    }, "POST", JSON.stringify({
      start_date : this.state.startMonth.format('YYYYMM').toString(),
      end_date : this.state.endMonth.format('YYYYMM').toString(),
      branch: this.state.id_unit.toString(),
      mainbr: this.state.id_cabang.toString(),
      region: this.state.id_kanwil
    })
    )
  }
  loadNominalMerchant(){
    console.log('load nominal merchant')
      callAPI(this.SummaryReportURL+'bri360/summary-dashboard/top-nominal-merchant', (response) => {

        // var response = {
        //   "status" : 200,
        //   "data" : {
        //     "Tokopedia" : 1000, 
        //     "Shopee" : 600,
        //     "Bukalapak" : 500,
        //     "Alfamart" : 356,
        //     "Traveloka" : 346
        //   },
        //   "period_date": ["201901","201902"],
        //   "modified_date": "2019-12-16 14:23:45"
        // }
        
  
        var periode_date = ""
        if (response.period_date.length == 2){
          var year_start_period = response.period_date[0].substr(0,4)
          var year_end_period = response.period_date[1].substr(0,4)
          if (year_start_period == year_end_period){
            periode_date = this.state.months[response.period_date[0].substr(4)]+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
          }else{
            periode_date = this.state.months[response.period_date[0].substr(4)]+' '+year_start_period+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
          }
        }
  
        this.setState({
          label_nom_merchant : Object.keys(response.data),
          data_nom_merchant: Object.values(response.data),
          modif_date_nom_merchant: moment(response.modified_date).format("DD MMMM YYYY HH:mm:ss"),
          period_date_nom_merchant: periode_date
        })
  
      }, "POST", JSON.stringify({
        start_date : this.state.startMonth.format('YYYYMM').toString(),
        end_date : this.state.endMonth.format('YYYYMM').toString(),
        branch: this.state.id_unit.toString(),
        mainbr: this.state.id_cabang.toString(),
        region: this.state.id_kanwil
      })
      )
  }

  // Download
  downloadCSV(){
    console.log('download csv')
  }



  render() {

    console.log(this.state.options_kanwil)
    console.log("Tupai")
    const { MonthPicker } = DatePicker;
    const barPorto = {
      labels: this.state.label_produk,
      datasets: [
        {
          label: 'Produk',
          backgroundColor: '#2eabf5',
          borderColor: '#2eabf5',
          borderWidth: 1,
          data: this.state.data_produk
        }
      ]
    };

    const OptionstackFasrek = {
      scales: {
           xAxes: [{
               stacked: true
           }],
           yAxes: [{
               stacked: true
           }]
       },
       maintainAspectRatio: true,
   }

   const stackFasrek ={ 
      labels: this.state.label_fasrek,
      datasets: [
        {
          label: 'Aktif',
          backgroundColor: "#2eabf5",
          borderColor: "#2eabf5",
          borderWidth: 1,
          stack: '2',
          data: this.state.data_fasrek["aktif"],
        },
        {
          label: 'Tidak Aktif',
          backgroundColor: "#f66d6e",
          borderColor: "#f66d6e",
          borderWidth: 1,
          stack: '2',
          data: this.state.data_fasrek["tidak_aktif"],
        },
      ]};

    // PieFasrek akan di ganti
    const PieFasrek = {
      labels: [
        'Prioritas',
        'Reg SMS',
        'SMS FIN',
        'Internet FIN',
        'Reg Internet',
        'Reg Phone',
        'Briva Autopayment',
        'DPLK Autopayment',
        'FIF Autopayment',
        'PLN Autopayment',
        'Telkom Autopayment',
        'Notif SMS',
        'Notif Email',
        'Credit Card'
      ],
      datasets: [{
        data: [300, 50, 100, 200, 340, 100, 350, 245, 124, 267, 90, 246, 82, 268],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FFCE57',
        '#FFCE58',
        '#FFCE59',
        '#FFCE50',
        '#FFCE51',
        '#FFCE52',
        '#FFCE53',
        '#FFCE54',
        '#FFCE55',
        '#FFCE16',
        '#FFCE26',
        ],
        // hoverBackgroundColor: [
        // '#FF6384',
        // '#36A2EB',
        // '#FFCE56'
        // ]
      }]
    };

    const PieSegmentasi = {
      labels: this.state.label_segmentasi,
      datasets: [{
        data: this.state.data_segmentasi,
        backgroundColor: [
          '#4dbd74',
          '#f86c6b',
          '#29363d',
          '#ffc107',
          '#20a8d8',
          '#63c2de'
        ],
        hoverBackgroundColor: [
          '#4dbd74',
          '#f86c6b',
          '#29363d',
          '#ffc107',
          '#20a8d8',
          '#63c2de'
        ]
      }]
    };


    const linePosisiSaldo= {
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      labels: this.state.label_posisi_saldo,
      datasets: [
        {
          label: 'Saldo Saat Ini',
          borderColor: 'rgba(46, 171, 245, 0.4)',
          backgroundColor: 'rgba(46, 171, 245, 0.2)',
          pointBorderColor: 'rgba(46, 171, 245, 0.6)',
          pointBackgroundColor: 'rgba(46, 171, 245, 0.4)',
          pointBorderWidth: 1,
          data: this.state.data_posisi_saldo_saat_ini,
          fill: false
        },
        {
          label: 'Saldo Rata-rata',
          borderColor: 'rgba(77,189,116, 0.8)',
          backgroundColor: 'rgba(77,189,116, 0.4)',
          pointBorderColor: 'rgba(77,189,116, 0.8)',
          pointBackgroundColor: 'rgba(77,189,116, 0.6)',
          pointBorderWidth: 1,
          data: this.state.data_posisi_saldo_rata_rata,
          fill: false
        },
      ]
    }

    const barNasabahKeluar= {
      labels: this.state.label_nasabah_keluar,
      datasets: [
        {
          backgroundColor: [
            '#4dbd74',
            '#ffc107',
            '#f86c6b'
            ],
          data: this.state.data_nasabah_keluar,
        }
      ]
    };

    const barRatasSaldo= {
      labels: this.state.label_ratas_saldo,
      datasets: [
        {
          // label: 'Prediksi Ratas Saldo',
          backgroundColor: [
            '#4dbd74',
            '#f86c6b'
            ],
          // borderColor: 'rgba(255,99,132,1)',
          // borderWidth: 1,
          // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          // hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.data_ratas_saldo
        }
      ]
    };

    const barFreqMerchant= {
      labels: this.state.label_frek_merchant,
      datasets: [
        {
          label: 'Merchant',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.data_frek_merchant
        }
      ]
    };

    const barNomMerchant= {
      labels: this.state.label_nom_merchant,
      datasets: [
        {
          label: 'Merchant',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.data_nom_merchant
        }
      ]
    };
   return (
      <div className="animated fadeIn">
 
        {/* Branch Filtering */}
        <Row>
        <Col>
            <Card>
              <CardBody>
              <CardTitle className="mb-0 "><i className="fa fa-filter"></i>&nbsp;Filter Branch</CardTitle>
              <hr />
              <Row >
                  <Col sm={2} style={{marginLeft:'20px'}}>
                    <br />
                    <div className="text-muted">
                      <b>Branch</b>
                    </div>
                  </Col>
                  <Col sm={3}>
                      <div className="text-muted">Kanwil</div>
                      <Select name="select_kanwil" id="kanwil" value={this.state.valueKanwil} options={this.state.options_kanwil} onChange={this.handleKanwilChange} />
                  </Col>
                  <Col sm={3}>
                      <div className="text-muted">Cabang</div>
                      <Select name="select_cabang" id="cabang" value={this.state.valueCabang} options={this.state.options_cabang} onChange={this.handleCabangChange} />
                  </Col>
                  <Col sm={3}>
                      <div className="text-muted">Unit/KCP</div>
                      <Select name="select_unit" id="unit" value={this.state.valueUnit} options={this.state.options_unit} onChange={this.handleUnitChange} />
                  </Col>
              </Row>
              <br />
              <Row>
                  <Col sm={2} style={{marginLeft:'20px'}}>
                    <br />
                    <div className="text-muted">
                      <b>Periode Data</b>
                    </div>
                  </Col>
                  <Col sm={3} className="costumMonthPicker">
                    <div className="text-muted">Tanggal Awal</div>
                    <MonthPicker className="text-center" disabledDate={this.disabledStartMonth} value={this.state.startMonth} format='YYYY-MM' onChange={this.onChangeStartMonth} placeholder="Tanggal Awal" />
                  </Col>
                  <Col sm={3} className="costumMonthPicker">
                  <div className="text-muted">Tanggal Akhir</div>
                    <MonthPicker className="text-center" disabledDate={this.disabledEndMonth} value={this.state.endMonth} format='YYYY-MM'  onChange={this.onChangeEndMonth} placeholder="Tanggal Akhir" />
                  </Col>
                  
                </Row>
                <Row>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div>
                      <div className="text-center">
                      <br />
                      <button type="button" className="btn btn-summary" onClick={() => this.handleFilter()} ><i className="fa fa-filter"></i>&nbsp;&nbsp;Filter&nbsp;</button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody> 
                <Row>
                  <Col sm={5}>
                    <CardTitle className="mb-0">10 Frekuensi Portofolio Produk Tertinggi </CardTitle>
                    <div className="small text-muted">
                      Periode {this.state.period_date_produk} | Update {this.state.modif_date_produk}
                    </div>
                  </Col>
                  <Col sm={7} className="d-none d-sm-inline-block">
                    <button className="float-right btn btn-summary"> <i className="icon-cloud-download"></i>&nbsp;Download</button>
                  </Col>
                </Row>
                <hr />
                {/* Content Frekuensi Portofolio */}
                <Bar data={barPorto} height={75} options={{ maintainAspectRatio: true }} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody> 
                <Row>
                  <Col sm={5}>
                    <CardTitle className="mb-0">Fasilitas Rekening </CardTitle>
                    <div className="small text-muted">
                      Periode {this.state.period_date_fasrek} | Update {this.state.modif_date_fasrek}
                    </div>
                  </Col>
                  <Col sm={7} className="d-none d-sm-inline-block">
                    <button className="float-right btn btn-summary"> <i className="icon-cloud-download"></i>&nbsp;Download</button>
                  </Col>
                </Row>
                <hr />
                {/* Content Fasilitas Rekening */}
                <Bar data={stackFasrek} height={75} options={OptionstackFasrek} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Card>
              <CardBody> 
                <Row>
                  <Col sm={9}>
                    <CardTitle className="mb-0">Fasilitas Rekening </CardTitle>
                    <div className="small text-muted">
                      Periode Oktober 2019 | Update 5 Desember 2019
                    </div>
                  </Col>
                  <Col sm={3} className="d-none d-sm-inline-block">
                    <button className="float-right btn btn-summary"> <i className="icon-cloud-download"></i>&nbsp;Download</button>
                  </Col>
                </Row>
                <hr />
                {/* Content Fasilitas Rekening */}
                <Doughnut data={PieFasrek} height={150} options={{ maintainAspectRatio: true }} />
              </CardBody>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <CardBody> 
                <Row>
                  <Col sm={9}>
                    <CardTitle className="mb-0">Segmentasi </CardTitle>
                    <div className="small text-muted">
                      Periode {this.state.period_date_segmentasi} | Update {this.state.modif_date_segmentasi}
                    </div>
                  </Col>
                  <Col sm={3} className="d-none d-sm-inline-block">
                    <button className="float-right btn btn-summary"> <i className="icon-cloud-download"></i>&nbsp;Download</button>
                  </Col>
                </Row>
                <hr />
                {/* Content Segmentasi */}
                <Doughnut data={PieSegmentasi} height={150} options={{ maintainAspectRatio: true }} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody> 
                <Row>
                  <Col sm={5}>
                    <CardTitle className="mb-0">Posisi Saldo</CardTitle>
                    <div className="small text-muted">
                    Periode {this.state.period_date_posisi_saldo} | Update {this.state.modif_date_posisi_saldo}
                    </div>
                  </Col>
                  <Col sm={7} className="d-none d-sm-inline-block">
                    <button className="float-right btn btn-summary"> <i className="icon-cloud-download"></i>&nbsp;Download</button>
                  </Col>
                </Row>
                <hr />
                {/* Content Frekuensi Portofolio */}
                <Line data={linePosisiSaldo} height={75} options={{ maintainAspectRatio: true }} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Card>
              <CardBody> 
                <Row>
                  <Col sm={9}>
                    <CardTitle className="mb-0">Prediksi Nasabah Keluar</CardTitle>
                    <div className="small text-muted">
                      Periode {this.state.period_date_nasabah_keluar} | Update {this.state.modif_date_nasabah_keluar}
                    </div>
                  </Col>
                  <Col sm={3} className="d-none d-sm-inline-block">
                    <button className="float-right btn btn-summary"> <i className="icon-cloud-download"></i>&nbsp;Download</button>
                  </Col>
                </Row>
                <hr />
                {/* Content Prediksi Nasabah Keluar */}
                <Bar data={barNasabahKeluar} height={100} options={this.options} />
              </CardBody>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <CardBody> 
                <Row>
                  <Col sm={9}>
                    <CardTitle className="mb-0">Prediksi Ratas Saldo</CardTitle>
                    <div className="small text-muted">
                      Periode {this.state.period_date_ratas_saldo} | Update {this.state.modif_date_ratas_saldo}
                    </div>
                  </Col>
                  <Col sm={3} className="d-none d-sm-inline-block">
                  <button className="float-right btn btn-summary"> <i className="icon-cloud-download"></i>&nbsp;Download</button>
                  </Col>
                </Row>
                <hr />
                {/* Content Prediksi Ratas Saldo */}
                <Bar data={barRatasSaldo} height={100} options={this.options} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody> 
                <Row>
                  <Col sm={9}>
                    <CardTitle className="mb-0">10 Frekuensi Transaksi Merchant Tertinggi</CardTitle>
                    <div className="small text-muted">
                      Periode {this.state.period_date_frek_merchant} | Update {this.state.modif_date_frek_merchant}
                    </div>
                  </Col>
                  <Col sm={3} className="d-none d-sm-inline-block">
                    <button className="float-right btn btn-summary"> <i className="icon-cloud-download"></i>&nbsp;Download</button>
                  </Col>
                </Row>
                <hr />
                {/* Content Frekuensi Transaksi Merchant Tertinggi */}
                <Bar data={barFreqMerchant} height={100} options={{ maintainAspectRatio: true }} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody> 
                <Row>
                  <Col sm={9}>
                    <CardTitle className="mb-0">10 Nominal Transaksi Merchant Tertinggi</CardTitle>
                    <div className="small text-muted">
                      Periode {this.state.period_date_nom_merchant} | Update {this.state.modif_date_nom_merchant}
                    </div>
                  </Col>
                  <Col sm={3} className="d-none d-sm-inline-block">
                    <button className="float-right btn btn-summary"> <i className="icon-cloud-download"></i>&nbsp;Download</button>
                  </Col>
                </Row>
                <hr />
                {/* Content Nominal Transaksi Merchant Tertinggi */}
                <Bar data={barNomMerchant} height={100} options={{ maintainAspectRatio: true }} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SummaryReport
