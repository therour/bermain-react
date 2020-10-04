import React from 'react';
import { Container } from 'reactstrap';
import './scss/app.scss';
import Select from 'react-select';
import { useState } from 'react';
import { useEffect } from 'react';
import request from './utils/request';


function App() {
  const [penduduk, setPenduduk] = useState([]);
  const [pendudukTerpilih, setPendudukTerpilih] = useState(null);

  const [cariKK, setCariKK] = useState('');
  const [listKeluarga, setListKeluarga] = useState([]);

  const [listPenguasa, setListPenguasa] = useState([]);

  useEffect(() => {
    request.get('sad-penduduk-list').then(res => {
      setPenduduk(res.data);
    })
  }, [])

  useEffect(() => {
    request.get('sad-keluarga-list').then(res => {
      setListKeluarga(res.data);
    })
  }, [])

  function kananClick(keluarga) {
    setListPenguasa([...listPenguasa, keluarga]);
    setListKeluarga(listKeluarga.filter(k => k.no_kk != keluarga.no_kk));
  }

  return (<Container>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <Select
            options={penduduk}
            getOptionLabel={(option) => `${option.nik} - ${option.nama}`}
            getOptionValue={(option) => option.nik}
            value={pendudukTerpilih}
            onChange={(option) => setPendudukTerpilih(option)}
          />
        </div>

        <div className="form-group">
          <input type="text" name="cari_kk" id="cari_kk" value={cariKK} onChange={(event) => setCariKK(event.target.value)} className="form-control"/>
        </div>

        <div style={{ maxHeight: 400, overflowY: 'scroll' }}>
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>NO KK</th>
                <th>Nama KK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listKeluarga
                .filter((keluarga) =>
                  (keluarga.nama_kk.toUpperCase().indexOf(cariKK.toUpperCase()) !== -1)
                  || (keluarga.no_kk.toUpperCase().indexOf(cariKK.toUpperCase()) !== -1)
                )
                .map((keluarga) => (
                <tr>
                  <td className="align-middle">{keluarga.no_kk}</td>
                  <td className="align-middle">{keluarga.nama_kk}</td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => kananClick(keluarga)}>&gt;&gt;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-6">
        <div>
          Pemilik: {pendudukTerpilih && <strong>{pendudukTerpilih.nama}</strong>}
        </div>
        <div>
          Penguasa:
          <pre>{JSON.stringify(listPenguasa, null, 2)}</pre>
        </div>
      </div>
    </div>

  </Container>)
}

export default App;
