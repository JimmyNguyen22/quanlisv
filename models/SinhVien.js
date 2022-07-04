function SinhVien() {
    this.maSinhVien = 0;
    this.tenSinhVien = '';
    this.email = '';
    this.matKhau = '';
    this.ngaySinh = '';
    this.khoaHoc = '';
    this.diemToan = 0;
    this.diemLy = 0;
    this.diemHoa = 0;

    this.tinhDiemTrungBinh = function() {
        var diemTB = (Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa)) / 3;
        return diemTB;
    }
    this.xepLoai = function() {
        var hang = '';
        if (diemTB >= 8) {
            hang = 'Giỏi';
        } else if (diemTB >= 7) {
            hang = 'Khá';
        }
        return hang;
    }
}