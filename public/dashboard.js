{
  keyMetrics: {
    total: 30.10,
    normal: 50.2,
    warning: 50.2,
    danger: 50.2,
    blocked: 50.2,
    nonBlocked: 50.2,
  }
  scorePercentage: {
    normal: {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    },
    warning: {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    },
    danger: {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    }
  },
  charts : {
    day: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [100, 20, 30, 11, 30, 40, 100]
        },
        {
          label: 'My Third dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [34, 30, 111, 50, 20, 44, 15]
        }
      ]
    },
    channel: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(43,10,43,0.2)',
          borderColor: 'rgba(43,10,43,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [45, 79, 10, 41, 36, 95, 10]
        }
      ]
    }
  },
  lastTransaction: [
    {
      card: '638910913091390139',
      amount: 'Rp 7109313',
      terminalType: 'ATM Merah Putih',
      terminalID: '331712',
      terminalInformation: 'Test',
      statusTransaction: '',
      transDate: 'Saturday, 18th 2018',
      transTime: '09.10',
      descriptionTransaction: '',
      longitude: '',
      latitude: '',
      prevTerminalID: '',
      prevLongitude: '',
      prevLatitude: '',
      prevTransDate: '',
      prevTransTime: '',
      prevStatus: '',
      labelFraudLocation: '',
      scoreFraudLocation: '',
      labelFraudSequence: 'normal',
      scoreFraudSequence: '',
      remark: '',
      status: '',
      currency: '',
      sequence: ''
    },
    {
      card: '6894729482252',
      amount: 'Rp 2244242',
      terminalType: 'DCE',
      terminalID: '999211',
      terminalInformation: 'Test',
      statusTransaction: '',
      transDate: 'Monday, 18th 2018',
      transTime: '20.45',
      descriptionTransaction: '',
      longitude: '',
      latitude: '',
      prevTerminalID: '',
      prevLongitude: '',
      prevLatitude: '',
      prevTransDate: '',
      prevTransTime: '',
      prevStatus: '',
      labelFraudLocation: '',
      scoreFraudLocation: '',
      labelFraudSequence: 'danger',
      scoreFraudSequence: '',
      remark: '',
      status: '',
      currency: '',
      sequence: ''
    }
  ]
}
