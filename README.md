### Giriş

Film Arama Uygulaması, kullanıcıların film bilgilerini kolayca arayabileceği ve görüntüleyebileceği basit bir web uygulamasıdır. Bu uygulama, OMDb API'sini kullanarak film bilgilerini getirir ve kullanıcıya sunar. OMDb API, film veritabanı bilgilerini sağlayan bir hizmettir.

### İçindekiler
- Proje Yapısı
- Kullanılan Teknolojiler
- Kurulum ve Çalıştırma
- Ana Sayfa
- Film Detay Sayfası
- Yer İmleri Sayfası
- CSS ve Stil Dosyaları
- JavaScript ve AJAX Kullanımı

### Proje Yapısı

Proje aşağıdaki dosya ve klasör yapısına sahiptir:

```
MovieSearchApp/
│
├── Styles/
│   └── Index.css
│
├── Scripts/
│   └── Index.js
│
├── Img/
│   └── default_poster.svg
│
├── Index.html
├── Movie_Detail.html
└── Bookmarks.html
```

### Kullanılan Teknolojiler

- **HTML**: Sayfa yapısını oluşturmak için kullanılır.
- **CSS**: Sayfa stilini ve düzenini belirlemek için kullanılır.
- **JavaScript (jQuery)**: Dinamik içerik yüklemek ve kullanıcı etkileşimlerini yönetmek için kullanılır.
- **Bootstrap**: Sayfa düzeni ve stil bileşenleri için kullanılır.
- **OMDb API**: Film bilgilerini almak için kullanılır.

### Kurulum ve Çalıştırma

1. Proje dosyalarını bilgisayarınıza indirin veya kopyalayın.
2. Proje klasörüne gidin ve `Index.html` dosyasını bir web tarayıcısında açın.
3. Uygulama otomatik olarak çalışacaktır.

### Ana Sayfa

Ana sayfa, kullanıcıların film araması yapabileceği ve rastgele filmler görebileceği bir arayüz sunar.

- **Arama Bölümü**: Kullanıcılar film adı veya türü girerek arama yapabilir.
- **Rastgele Film Alanı**: Sayfa yüklendiğinde rastgele bir film türünden filmler gösterilir.
- **Sonuç Bölümü**: Arama sonuçları burada görüntülenir.

### Film Detay Sayfası

Film detay sayfası, seçilen filmin detaylı bilgilerini gösterir.

- **Film Posteri**: Filmin posteri.
- **Film Bilgileri**: Başlık, çıkış tarihi, puan, süre, tür, yönetmen, oyuncular, özet, dil, ülke, ödüller ve gişe bilgileri.

### Yer İmleri Sayfası

Yer imleri sayfası, kullanıcıların favori filmlerini görüntüleyebileceği bir alandır.

- **Arama Bölümü**: Kullanıcılar yer imlerindeki filmleri arayabilir.
- **Sonuç Bölümü**: Yer imlerine eklenen filmler burada listelenir.

### CSS ve Stil Dosyaları

`Styles/Index.css` dosyası, sayfanın stilini ve düzenini belirler.

- **Genel Stil**: Tüm sayfa elemanlarının varsayılan stilini belirler.
- **Responsive Tasarım**: Farklı ekran boyutlarına uyum sağlar.
- **Özel Sınıflar**: Belirli elemanlar için özel stiller tanımlar.

### JavaScript ve AJAX Kullanımı

`Scripts/Index.js` dosyası, sayfanın dinamik işlevselliğini sağlar.

- **Film Arama**: Kullanıcı arama yaptığında OMDb API'den film bilgilerini alır ve sonuçları görüntüler.
- **Film Detayları**: Seçilen filmin detaylarını yükler ve modal pencerede gösterir.
- **Yer İmleri**: Kullanıcıların favori filmlerini yer imlerine eklemesine ve çıkarmasına olanak tanır.

### OMDb API Anahtarı

Bu proje, OMDb API'sini kullanmak için bir API anahtarına ihtiyaç duyar. `Scripts/Index.js` dosyasındaki `apiKey` değişkenine kendi OMDb API anahtarınızı ekleyin. Bu anahtar, OMDb API'ye erişim sağlar ve film bilgilerini almanıza olanak tanır.

```javascript
const apiKey = "YOUR_API_KEY"; // Kendi OMDb API anahtarınızı buraya yazın.
```

### Katkıda Bulunma

Bu projeye katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın. Her türlü katkı ve geri bildirim memnuniyetle karşılanır.

### Lisans

Bu proje, The GNU General Public License v3.0 Lisansı ile lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına bakabilirsiniz.

### Sonuç

Bu teknik dökümantasyon, Film Arama Uygulaması'nın nasıl çalıştığını ve nasıl kullanılacağını detaylı bir şekilde açıklamaktadır. Projeyi kurmak ve kullanmak için gerekli adımları takip ederek, film bilgilerini kolayca arayabilir ve görüntüleyebilirsiniz. 

Bu `README.md` dosyası, projenizin yapısını, kurulumunu ve kullanımını açıklar. Ayrıca, OMDb API anahtarının nasıl kullanılacağını belirtir.
