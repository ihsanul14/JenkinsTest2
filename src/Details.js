import React from "react";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //         isAddProduct: false,
      //   error: null,
      //   response: {},
      //   product: {},
      //   isEditProduct: false
      //     datas : [],
      Cifno: "",
      Tipe_Nasabah: "",
      Tipe_Nasabah_Desc: "",
      Kode_Bidang_Pekerjaan: "",
      Kode_Jabatan: "",
      Kode_Jenis_Pekerjaan: "",
      Kode_Pendidikan: "",
      Bidang_Pekerjaan: "",
      Jenis_Kelamin: "",
      Jenis_Pekerjaan: "",
      Nama_Kantor: "",
      Pendidikan: "",
      Nama_Sesuai_ID: "",
      Kewarganegaraan: "",
      Jabatan: "",
      // data: {
      //   Cifno : "",
      //   Tipe_Nasabah : "",
      //   Tipe_Nasabah_Desc : "",
      //   Kode_Bidang_Pekerjaan: "",
      //   Kode_Jabatan : "",
      //   Kode_Jenis_Pekerjaan : "",
      //   Kode_Pendidikan : "",
      //   Bidang_Pekerjaan : "",
      //   Jenis_Kelamin : "",
      //   Jenis_Pekerjaan : "",
      //   Nama_Kantor : "",
      //   Pendidikan : "",
      //   Nama_Sesuai_ID : "",
      //   Kewarganegaraan : "",
      //   Jabatan : ""
      // }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    // https://jsonplaceholder.typicode.com/posts
    fetch(
      "http://192.168.100.63:8090/customerinfo/" + this.props.match.params.id
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          // data: {
          Cifno: json.message.cifno,
          Tipe_Nasabah: json.message.tipe_nasabah,
          Nama_Sesuai_ID: json.message.nama_sesuai_id,
          Tipe_Nasabah_Desc: json.message.tipe_nasabah_desc,
          Kode_Bidang_Pekerjaan: json.message.kode_bidang_pekerjaan,
          Kode_Jabatan: json.message.kode_jabatan,
          Kode_Jenis_Pekerjaan: json.message.kode_jenis_pekerjaan,
          Kode_Pendidikan: json.message.kode_pendidikan,
          Bidang_Pekerjaan: json.message.bidang_pekerjaan,
          Jenis_Kelamin: json.message.jenis_kelamin,
          Jenis_Pekerjaan: json.message.jenis_pekerjaan,
          Nama_Kantor: json.message.nama_kantor,
          Pendidikan: json.message.pendidikan,
          Nama_Sesuai_ID: json.message.nama_sesuai_id,
          Kewarganegaraan: json.message.kewarganegaraan,
          Jabatan: json.message.jabatan,
          // }
        });
      });
  }

  handleChange = (e) => {
    console.log(e);
    let datas = this.state.data;
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cifno: this.state.Cifno,
        nama_sesuai_id: this.state.Nama_Sesuai_ID,
        tipe_nasabah: this.state.Tipe_Nasabah,
        tipe_nasabah_desc: this.state.Tipe_Nasabah_Desc,
        jenis_kelamin: this.state.Jenis_Kelamin,
        kewarganegaraan: this.state.Kewarganegaraan,
        kode_pendidikan: this.state.Kode_Pendidikan,
        pendidikan: this.state.Pendidikan,
        kode_jenis_pekerjaan: this.state.Kode_Jenis_Pekerjaan,
        jenis_pekerjaan: this.state.Jenis_Pekerjaan,
        nama_kantor: this.state.Nama_Kantor,
        kode_bidang_pekerjaan: this.state.Kode_Bidang_Pekerjaan,
        bidang_pekerjaan: this.state.Bidang_Pekerjaan,
        kode_jabatan: this.state.Kode_Jabatan,
        jabatan: this.state.Jabatan,
      }),
    };
    fetch(
      "http://localhost:8090/customerinfo/" + this.props.match.params.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ Cifno: data.Cifno }));
  };

  render() {
    return (
      <div>
        <table className="table" style={{ backgroundColor: "white" }}>
          <tr>
            <td>Cifno</td>
            <td>{this.state.Cifno}</td>
          </tr>
          <tr>
            <td>Nama Lengkap</td>
            <td>{this.state.Nama_Sesuai_ID}</td>
          </tr>
          <tr>
            <td>Tipe Nasabah</td>
            <td>{this.state.Tipe_Nasabah}</td>
          </tr>
          <tr>
            <td>Deskripsi Tipe Nasabah</td>
            <td>{this.state.Tipe_Nasabah_Desc}</td>
          </tr>
          <tr>
            <td>Jenis Kelamin</td>
            <td>{this.state.Jenis_Kelamin}</td>
          </tr>
          <tr>
            <td>Kewarganegaraan</td>
            <td>{this.state.Kewarganegaraan}</td>
          </tr>
          <tr>
            <td>Kode Pendidikan</td>
            <td>{this.state.Kode_Pendidikan}</td>
          </tr>
          <tr>
            <td>Pendidikan</td>
            <td>{this.state.Pendidikan}</td>
          </tr>
          <tr>
            <td>Kode Jenis Pekerjaan</td>
            <td>{this.state.Kode_Jenis_Pekerjaan}</td>
          </tr>
          <tr>
            <td>Jenis Pekerjaan</td>
            <td>{this.state.Jenis_Pekerjaan}</td>
          </tr>
          <tr>
            <td>Nama Kantor</td>
            <td>{this.state.Nama_Kantor}</td>
          </tr>
          <tr>
            <td>Kode Bidang Pekerjaan</td>
            <td>{this.state.Kode_Bidang_Pekerjaan}</td>
          </tr>
          <tr>
            <td>Bidang Pekerjaan</td>
            <td>{this.state.Bidang_Pekerjaan}</td>
          </tr>
          <tr>
            <td>Kode Jabatan</td>
            <td>{this.state.Kode_Jabatan}</td>
          </tr>
          <tr>
            <td>Jabatan</td>
            <td>{this.state.Jabatan}</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Details;
