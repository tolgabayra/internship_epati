Webpack web uygulamalarında kullanılan JavaScript dosyalarını tek parça haline getirmek için kullanılan modül paketleyicisidir.
Kullanılan JavaScript uygulaması ek kütüphanelere ihtiyaç duymaktadır.Sonuçta JavaScript dosyalarının artması web uygulamarının yükünü artırmak ile beraber yavaş çalışmasına neden olur.
Ve bu dosyaların paketlenmesi ve birleştirilmesi gerekir.

Webpack Konsept;

Entry: Projenin bağımlılık grafiğini nereden başlayarak oluşturması gerektiği bildirilir. İşlenecek dosyaları (Başlangıç noktası) default olarak ./src/index.js

Output: Webpack tarafından işlenen ve oluşturulan bundle paketinin nereye konulacağını ve nasıl isimlendirmek gerektiğini söyler. [./dist/bundle.js]

Loaders: Webpack varsayılan olarak JavaScript ve Json işleyebilmektedir. Bu yapılar SASS, LESS, ES6, TYPESCRIPT , COFFE gibi çevrim gerektiren işlemleri yapar. Önce bu modülleri indirmek gerekir.


Sonra gerekli ayarlar webpack.config.js dosyasına yazılarak işlenmeye hazır hale getirir.
Loader en basit hali ile iki özelliği içerir;
1.test : test parametresibe regex olarak bi ifade verilir.öylece o regex’e dahil olan tüm dosyalar ilgili loader tarafından ele alınır.
2.use : özelliği ile hangi loader’ın bu dosyaları dönüştüreceği belirtilir.


Plugins: Loader'ların yetmediği bazı işlemleri ve görevleri plugin'ler yardımıyla yaparız. Plugin'ler asset management, bundle minimization, optimization gibi birçok görevi yerine getirebilir.

Mode: Bu parametre ise production, development veya none ifadelerini almaktadır.
Production modu kodun optimize edilmiş halini, development modu geliştirme yaparken kullandığımız optimize edilmemiş halini işaret eder.






Step 1

Ufak bir webpack uygulaması ;


* Önce package.json dosyasını oluşturalım.
- npn init -y

* Webpack ve webpack-cli kurulumu
- npm install webpack webpack-cli --save-dev

* Webpack konfigürasyonlarını tanımlamak için webpack.config.js dosyasını oluşturalım

* Ardından src ve dist klasör yapısını kuralım.
src klasörü -> Entry
dist klasörü -> Output

webpack.config.js ayarları;

* mode parametresi
* entry parametresi
* output parametresi

ardından package.json scripts ayarları

"dev" : "webpack --mode=development"
"build"": "webpack --mode=production" //optimize







Step 2


---- Loaders ---

*Babel loader:
Modül güncel JavaScript komutlarını eski tarayıcılara uyumlu hale getirir

- npm install babel-loader babel-core babel-preset-env --save-dev

modul indirdikten sonra webpack config ayarları
module: {
    rules: [
        {

        }
    ]
}

formatında yazıyoruz
Ardından Kodumuz build olduğunda tarayıcıların anlayabileceği formata otomatik olarak çevrilecektir


** Css loader ve style-loader
 css-loader uygulamadaki tüm stilleri toplar ve string haline dönüştürür. style-loader ise bu string çıktısını alır ve html sayfamızda <style> tagleri arasına yazar.

- npm install --save-dev css-loader style-loader

ardından webpack ayarlarını yapalım

- src klasörü altında bir css dosyası ekleyelim
- index.css dosyasını  index.js de çağıralım

ardından işleri kolaylaştıemak için wepack-dev server kuralım
- npm install --save-dev webpack-dev-server

ardından package.json doyasını güncelle

ardından npm run start komutu çalıştır.


*Saas loader
Webpack ile sass dosyalarını css dosyalarına çevirmek için node-sass ve sass-loader paketlerini yüklememiz gerekir. sass-loader node-sass yardımıyla sass dosyalarını css dosyalarına çevrilecektir

- npm install --save-dev node-sass sass-loader

ardından webpack config ayarlrını yapalım


src/style index.saas

ardından npm run start


------Step 3 plugin ----


Webpack'de stilleri css dosyasına yazmak için mini-css-extract-plugin paketini yüklememiz gerekir.
- npm install --save-dev mini-css-extract-plugin


const MiniCssExtractPlugin = require('mini-css-extract-plugin')
ile import edip

plugin:[
    new MiniCssExtractPlugin({filename: 'style.css})
]

Config dosyamızda stillerimizi inline olarak kullanmak yerine css dosyasına yazmak istediğimiz style-loader'ı kaldırdık yerine MiniCssExtractPlugin.loader ekledik
use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']


-- webpack ile html yönetmek

npm install --save-dev html-webpack-plugin

new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
      // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.

      bu ayarı webpack.config e ekleyelim



npm run build alalım


---- HtmlTerserPlugin-----

