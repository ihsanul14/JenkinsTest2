import React from 'react'


class Create extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
    //         isAddProduct: false,
    //   error: null,
    //   response: {},
    //   product: {},
    //   isEditProduct: false
          Cifno : "",
          Tipe_Nasabah : "",
          Tipe_Nasabah_Desc : "",
          Kode_Bidang_Pekerjaan: "",
          Kode_Jabatan : "", 
          Kode_Jenis_Pekerjaan : "",
          Kode_Pendidikan : "",
          Bidang_Pekerjaan : "",
          Jenis_Kelamin : "",
          Jenis_Pekerjaan : "",
          Nama_Kantor : "",
          Pendidikan : "",
          Nama_Sesuai_ID : "",
          Kewarganegaraan : "",
          Jabatan : ""
  };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
    //   handleChange = (event) => {
    //     this.setState({[event.target.name]: event.target.value});
    //   }
    
      handleChange = (e) => {
        let datas = this.state.datas
        this.setState ({
          [e.target.name] : e.target.value
        })
        // // alert(datas)
        // let data = {
        //   "cifno" : this.state.Cifno,
        //     "nama_sesuai_id" : this.state.Nama_Sesuai_ID,
        //     "kewarganegaraan" : this.state.Kewarganegaraan
        // }
        // datas.push(data)
        // alert(datas)
      }

      handleSubmit = (e) => {
        e.preventDefault()
        const {Cifno, Nama_Sesuai_ID, Kewarganegaraan} = this.state
        // const form = new FormData()

        // form.append('username', 'malcoded')
        // form.append('file', data)
        // alert(this.state.datas)
        // alert({Cifno, Nama_Sesuai_ID, Kewarganegaraan})
        // console.log(cifno)
        // alert({[e.target.name] : e.target.value})
        // const response = fetch('http://localhost:8090/customerinfo', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: {
        //     "cifno" : this.state.Cifno,
        //     "nama_sesuai_id" : this.state.Nama_Sesuai_ID,
        //     "kewarganegaraan" : this.state.Kewarganegaraan,
        //   },
        // })
        // // alert(response)
        // // alert(response.json())
        // alert(response.json())

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            "cifno" : this.state.Cifno,
            "nama_sesuai_id" : this.state.Nama_Sesuai_ID,
            "tipe_nasabah" : this.state.Tipe_Nasabah,
            "tipe_nasabah_desc" : this.state.Tipe_Nasabah_Desc,
            "jenis_kelamin" : this.state.Jenis_Kelamin,
            "kewarganegaraan" : this.state.Kewarganegaraan,
            "kode_pendidikan" : this.state.Kode_Pendidikan,
            "pendidikan" : this.state.Pendidikan,
            "kode_jenis_pekerjaan" : this.state.Kode_Jenis_Pekerjaan,
            "jenis_pekerjaan" : this.state.Jenis_Pekerjaan,
            "nama_kantor" : this.state.Nama_Kantor,
            "kode_bidang_pekerjaan" : this.state.Kode_Bidang_Pekerjaan,
            "bidang_pekerjaan" : this.state.Bidang_Pekerjaan,
            "kode_jabatan" : this.state.Kode_Jabatan,
            "jabatan" : this.state.Jabatan
          })
      };
      fetch('http://localhost:8090/customerinfo', requestOptions)
          .then(response => response.json())
          .then(data => this.setState({ Cifno: data.Cifno }));
  }
    render(){
        // console.log(data.data.map(dat => dat.id))
        const {Cifno, Nama_Sesuai_ID, Kewarganegaraan} = this.state
        return (
            <div>
                <form ref="myForm" onSubmit={this.handleSubmit}>
                  <table className="table">
                    <tr>
                      <td>Cifno</td>
                      <td>
                        <input placeholder="Cifno" name="Cifno" onChange={this.handleChange} value={this.state.cifno} />
                      </td>
                    </tr>
                    <tr>
                      <td>Nama Lengkap</td>
                      <td>
                        <input placeholder="Nama Sesuai ID" name="Nama_Sesuai_ID" onChange={this.handleChange} value={this.state.Nama_Sesuai_ID} />
                      </td>
                    </tr>
                    <tr>
                      <td>Tipe Nasabah</td>
                      <td>
                        <input placeholder="Tipe Nasabah" name="Tipe_Nasabah" onChange={this.handleChange} value={this.state.Tipe_Nasabah} />
                      </td>
                    </tr>
                    <tr>
                      <td>Deskripsi Tipe Nasabah</td>
                      <td>
                        <input placeholder="Deskripsi Tipe Nasabah" name="Tipe_Nasabah_Desc" onChange={this.handleChange} value={this.state.Tipe_Nasabah_Desc} />
                      </td>
                    </tr>
                    <tr>
                      <td>Jenis Kelamin</td>
                      <td>
                        <input placeholder="M/F" name="Jenis_Kelamin" onChange={this.handleChange} value={this.state.Jenis_Kelamin} />
                      </td>
                    </tr>
                    <tr>
                      <td>Kewarganegaraan</td>
                      <td>
                        <input placeholder="Kewarganegaraan" name="Kewarganegaraan" onChange={this.handleChange} value={this.state.Kewarganegaraan} />
                      </td>
                    </tr>
                    <tr>
                      <td>Kode Pendidikan</td>
                      <td>
                        <input placeholder="Kode Pendidikan" name="Kode_Pendidikan" onChange={this.handleChange} value={this.state.Kode_Pendidikan} />
                      </td>
                    </tr>
                    <tr>
                      <td>Pendidikan</td>
                      <td>
                        <input placeholder="Pendidikan" name="Pendidikan" onChange={this.handleChange} value={this.state.Pendidikan} />
                      </td>
                    </tr>
                    <tr>
                      <td>Kode Jenis Pekerjaan</td>
                      <td>
                        <input placeholder="Kode Jenis Pekerjaan" name="Kode_Jenis_Pekerjaan" onChange={this.handleChange} value={this.state.Kode_Jenis_Pekerjaan} />
                      </td>
                    </tr>
                    <tr>
                      <td>Jenis Pekerjaan</td>
                      <td>
                        <input placeholder="Jenis Pekerjaan" name="Jenis_Pekerjaan" onChange={this.handleChange} value={this.state.Jenis_Pekerjaan} />
                      </td>
                    </tr>
                    <tr>
                      <td>Nama Kantor</td>
                      <td>
                        <input placeholder="Nama Kantor" name="Nama_Kantor" onChange={this.handleChange} value={this.state.Nama_Kantor} />
                      </td>
                    </tr>
                    <tr>
                      <td>Kode Bidang Pekerjaan</td>
                      <td>
                        <input placeholder="Kode Bidang Pekerjaan" name="Kode_Bidang_Pekerjaan" onChange={this.handleChange} value={this.state.Kode_Bidang_Pekerjaan} />
                      </td>
                    </tr>
                    <tr>
                      <td>Bidang Pekerjaan</td>
                      <td>
                        <input placeholder="Bidang Pekerjaan" name="Bidang_Pekerjaan" onChange={this.handleChange} value={this.state.Bidang_Pekerjaan} />
                      </td>
                    </tr>
                    <tr>
                      <td>Kode Jabatan</td>
                      <td>
                        <input placeholder="Kode Jabatan" name="Kode_Jabatan" onChange={this.handleChange} value={this.state.Kode_Jabatan} />
                      </td>
                    </tr>
                    <tr>
                      <td>Jabatan</td>
                      <td>
                        <input placeholder="Jabatan" name="Jabatan" onChange={this.handleChange} value={this.state.Jabatan} />
                      </td>
                    </tr>
                  </table>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Create