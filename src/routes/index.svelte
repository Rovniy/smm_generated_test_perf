<script>
  import Header from '../components/header.svelte'
</script>

<style lang="sass">
@import '../style/common.sass'
</style>




<Header />



<section class="first">
  <div class="container">
    <div class="left-side">
      <p class="title">Накрутка и продвижение аккаунтов Инстаграм</p>
      <p class="description">Повышайте свою популярность в Instagram всего в несколько кликов, просто и эффективно!
    </div>

    <div class="right-side">
      <img src="/img/svg/promo.svg" width="512" height="425" alt="promo">
    </div>
  </div>
</section>

<section class="second">
  <h1>Накрутка Инстаграм</h1>
  <div class="carousels"></div>
</section>

<section class="third">
  <div class="carousels"></div>
</section>

<section class="fourth">
  <h1>Часто задаваемые вопросы</h1>
  <div class="accordion">
    <div class="info">
      <div class="info_title">Через какое время выполняются услуги?</div>
    </div>
    <div class="info info_open">
      <div class="info_title">Через какое время выполняются услуги?</div>
      <div class="more_info">Для заказа выберите услугу, введите ссылку и укажите количество. Вас перенаправит на сайт платежной системы, где нужно будет произвести оплату. После совершения оплаты Ваш заказ автоматически начнет выполняться.</div>
    </div>
    <div class="info">
      <div class="info_title">Через какое время выполняются услуги?</div>
    </div>
    <div class="info">
      <div class="info_title">Через какое время выполняются услуги?</div>
    </div>
  </div>
</section>

<section class="fifth">
  <h1>Наши приемущества</h1>
  <div class="seo"></div>
</section>

<footer class="footer">
  <div class="footer__container container">
    <div class="description">
      <a class="footer__logo" href="#">
        <img
          src="/img/misc/new-logo-ny-white.svg"
          width="123"
          height="38"
          alt="logo"
          loading="lazy" />
      </a>

      <div class="footer__text">
        Займись раскруткой своей страницы уже сегодня! Мы привлекаем качественную аудиторию для Вашего аккаунта, что сделает Вас популярным уже через несколько часов.
      </div>
    </div>
    <div class="navigation">
      <span style="color: #fff">НАВИГАЦИЯ:</span>
      <div class="navigation_items">
        <div class="left">
          <ul>
            <li>FAQ</li>
            <li>БЛОГ</li>
            <li>ОТЗЫВЫ</li>
          </ul>
        </div>

        <div class="right">
          <ul>
            <li>ЛИЧНЫЙ КАБИНЕТ</li>
            <li>ДОГОВОР ОФЕРТЫ</li>
            <li>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="contacts">
      <span style="color: #fff">КОНТАКТЫ:</span>
      <div>info@smmtouch.com</div>
      <div></div>
    </div>
  </div>
  <hr style="border: 1px solid #999999">
  <div class="footer__copyrights container">
    &copy; 2017 - 2022 Все права защищены.
  </div>
</footer>
