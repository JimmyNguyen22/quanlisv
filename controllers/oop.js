// MVC mô hình quản lí project

// M : Models chứa các file class (prototype) - lớp đối tượng, mỗi class đối tượng là 1 file
// V : View là nơi chứa các file html ( giao diện html)
// C : Controllers là nơi chứa các file xử lí cho giao diện cùng tên

var mangSinhVien = [];

document.querySelector('#btnThemSinhVien').onclick = function() {
    // input: thông tin sinh vien: SinhVien
    var sv = new SinhVien();
    // Lấy thông tin từ giao diện đưa vào input sv
    sv['maSinhVien'] = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.matKhau = document.querySelector('#matKhau').value;

    var ngaySinh = new Date(document.querySelector('#ngaySinh').value);
    sv.ngaySinh = ngaySinh.toLocaleDateString();

    sv.khoaHoc = document.querySelector('#khoaHoc').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;

    //output html : string 

    /*
    // cách 1  tạo html = createElement
    // bước 1 tạo ra thẻ tr
    var trSinhVien = document.createElement('tr');
    // tạo ra td maSinhVien
    var tdMaSinhVien = document.createElement('td');
    tdMaSinhVien.innerHTML = sv.maSinhVien;

    var tdTenSinhVien = document.createElement('td');
    tdTenSinhVien.innerHTML = sv.tenSinhVien;

    var tdEmail = document.createElement('td');
    tdEmail.innerHTML = sv.email;

    var tdNgaySinh = document.createElement('td');
    tdNgaySinh.innerHTML = sv.ngaySinh;

    var tdKhoaHoc = document.createElement('td');
    tdKhoaHoc.innerHTML = sv.khoaHoc;

    var tdDiemTrungBinh = document.createElement('td');
    tdDiemTrungBinh.innerHTML = sv.tinhDiemTrungBinh();

    //td chuc năng
    var btnXoa = document.createElement('button');
    btnXoa.innerHTML = 'Xóa';
    btnXoa.className = 'btn btn-danger';
    btnXoa.onclick = function() {
        // từ thẻ con DOM ra thẻ cha
        // var trParent = document.parentElement.parentElement;
        // closest: dom đến selector gần nhất chứa nó

        var trParent = btnXoa.closest('tr');
        trParent.remove();
    }

    var btnSua = document.createElement('button');
    btnSua.innerHTML = 'Sửa';
    btnSua.className = 'btn btn-primary';

    var tdChucNang = document.createElement('td');
    tdChucNang.appendChild(btnXoa);
    tdChucNang.appendChild(btnSua);
    // thêm nd td vào tr
    trSinhVien.appendChild(tdMaSinhVien);
    trSinhVien.appendChild(tdTenSinhVien);
    trSinhVien.appendChild(tdEmail);
    trSinhVien.appendChild(tdNgaySinh);
    trSinhVien.appendChild(tdKhoaHoc);
    trSinhVien.appendChild(tdDiemTrungBinh);
    trSinhVien.appendChild(tdChucNang);

    // Thêm nd tr vào giao diện
    var tBody = document.querySelector('#tbSinhVien');
    tBody.appendChild(trSinhVien)

    */


    // cach 2 : chuỗi innerHTML

    mangSinhVien.push(sv);
    // Sau khi them 1 sv => mảng có sv [{},{}]
    renderTableSinhVien(mangSinhVien);
    // Sau khi thêm sv thành công thì lưu mảng sinh viên vào localstorage
    let sMangSinhVien = JSON.stringify(mangSinhVien);
    luuLocalStorage('mangSinhVien', sMangSinhVien);
}

function renderTableSinhVien(arrSinhVien) {
    // output: html = '<tr> <td>  </td>....  </tr>'
    var htmlContent = '';
    // duyệt qua các object của mảng sv
    for (var index = 0; index < arrSinhVien.length; index++) {
        var sv = arrSinhVien[index]; // mỗi lần duyệt lấy ra 1 obj thứ index của arrSinhVien [{1},{2},{3}]
        // Từ obj tạo ra thẻ tr
        // Nếu bấm từ nút thêm ( dc new từ SinhVien => nên sẽ có tinhDiemTrungBinh )
        // nếu lấy từ localStorage thì bị mất phương thức tinhDiemTrungBinh
        //hasOwnProperty : nếu có tên thuộc tính đó trong object thì trả về giá trị true, ko có trả về false
        if (!sv.hasOwnProperty('tinhDiemTrungBinh')) {
            // .__proto__.: mở rộng thuộc tính cua obj
            sv.__proto__.tinhDiemTrungBinh = function() {
                let diemTB = (Number(sv.diemToan) + Number(sv.diemLy) + Number(sv.diemHoa)) / 3;
                return diemTB;
            }
        }

        var tr = `
                <tr>
                    <td> ${sv.maSinhVien}</td>
                    <td> ${sv.tenSinhVien}</td>
                    <td> ${sv.email}</td>
                    <td> ${sv.ngaySinh}</td>
                    <td> ${sv.khoaHoc}</td>
                    <td> ${sv.tinhDiemTrungBinh()}</td>
                    <td> 
                    <button class="btn btn-danger" onclick="xoaSinhVien('${index}')">Xóa</button> 
                    <button class="btn btn-danger ml-2" onclick="xoaTheoMa('${sv.maSinhVien}')">Xóa Mã SV</button>
                    <button class="btn btn-primary ml-2" onclick="suaSinhVien('${sv.maSinhVien}')">Sửa</button>

                    </td>
                </tr>
            `;
        // Mỗi lần tạo xong thẻ tr sẽ + vào output
        htmlContent += tr;
    }
    document.querySelector('#tbSinhVien').innerHTML = htmlContent;
}

function suaSinhVien(maSVClick) {
    for (let index = 0; index < mangSinhVien.length; index++) {
        // mỗi lần duyệt lấy ra 1 mảng sinh vien object
        let sinhVien = mangSinhVien[index];
        // Đem mã sv click so sánh với thằng object sinh viên lấy ra
        if (maSVClick == sinhVien.maSinhVien) {
            // tìm thấy
            // gán các giá trị từ object lên các thẻ input
            document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
            document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
            document.querySelector('#email').value = sinhVien.email;
            document.querySelector('#matKhau').value = sinhVien.matKhau;
            let date = moment(sinhVien.ngaySinh).format('YYYY-DD-MM');
            document.querySelector('#ngaySinh').value = date;
            document.querySelector('#khoaHoc').value = sinhVien.khoaHoc;
            document.querySelector('#diemToan').value = sinhVien.diemToan;
            document.querySelector('#diemLy').value = sinhVien.diemLy;
            document.querySelector('#diemHoa').value = sinhVien.diemHoa;
            break;
        }
    }
}

document.querySelector('#capNhat').onclick = function() {
    // lấy dữ liệu từ người dùng nhập vào sau khi chỉnh sửa 
    let capNhat = new SinhVien();
    capNhat['maSinhVien'] = document.querySelector('#maSinhVien').value;
    capNhat.tenSinhVien = document.querySelector('#tenSinhVien').value;
    capNhat.email = document.querySelector('#email').value;
    capNhat.matKhau = document.querySelector('#matKhau').value;

    var ngaySinh = new Date(document.querySelector('#ngaySinh').value);
    capNhat.ngaySinh = ngaySinh.toLocaleDateString();

    capNhat.khoaHoc = document.querySelector('#khoaHoc').value;
    capNhat.diemToan = document.querySelector('#diemToan').value;
    capNhat.diemLy = document.querySelector('#diemLy').value;
    capNhat.diemHoa = document.querySelector('#diemHoa').value;
    // Duyệt qua mảng object sinh viên cần cập nhật
    for (let index = 0; index < mangSinhVien.length; index++) {
        let svMang = mangSinhVien[index];
        if (svMang.maSinhVien === capNhat.maSinhVien) {
            // đem dữ liệu trong mảng sửa thành dữ liệu người dùng thay đổi
            svMang.tenSinhVien = capNhat.tenSinhVien;
            svMang.email = capNhat.email;
            svMang.ngaySinh = capNhat.ngaySinh;
            svMang.khoaHoc = capNhat.khoaHoc;
            svMang.diemToan = capNhat.diemToan;
            svMang.diemLy = capNhat.diemLy;
            svMang.diemHoa = capNhat.diemHoa;
            // sau khi cap nhat sv trong mang thì gọi hàm render lai table
            renderTableSinhVien(mangSinhVien);
            break;
        }
    }
}

function xoaSinhVien(index) {
    mangSinhVien.splice(index, 1);
    // Sau khi xoa sv xong thì tạo lại bảng
    renderTableSinhVien(mangSinhVien);
}

function xoaTheoMa(maSV) {
    let viTriXoa = -1;
    for (let index = 0; index < mangSinhVien.length; index++) {
        // mỗi lần duyệt lấy ra 1 sinh viên
        let arr = mangSinhVien[index];
        if (arr.maSinhVien == maSV) { // nếu obj sinh viên trong mảng == với mã sv đc click thì lấy ra vi tri
            viTriXoa = index;
            break;
        }
    }
    mangSinhVien.splice(viTriXoa, 1);
    // Sau khi xóa sv xong thì tạo lại table mới
    renderTableSinhVien(mangSinhVien);
}

function luuLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function layLocalStorage(key) {
    if (localStorage.getItem(key)) {
        return localStorage.getItem(key);
    }
    return undefined;
}

// định nghĩa sự kiện khi trang load xong html
window.onload = function() {
    let value = layLocalStorage('mangSinhVien');
    if (value !== undefined) {
        // biến đổi value thành mảng lại
        mangSinhVien = JSON.parse(value);
        // gọi hàm để từ mảng tạo ra table   
        renderTableSinhVien(mangSinhVien);
    }
}

// ========= Mở rộng thuộc tính của prototype (ko ảnh hưởng đến code của người trc)=========
// SinVien.prototype.tenThuocTinhMoRong = 'abc';
// SinhVien.prototype.tenThuocTinhMoRongFunc = function() {
//     console.log('abc');
// }

// var thuocTinh = new SinVien();
// console.log(thuocTinh.tenThuocTinhMoRong);
// thuocTinh.tenThuocTinhMoRongFunc();

//cai gi them xóa sửa = array