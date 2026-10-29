import React from 'react'
export default function Footer() {
  return (
    <footer className="footer"><div className="container">
      <div className="footer-grid">
        <div><h4>Мебель&Интерьер</h4><p style={{ fontSize: 14 }}>Мебель и предметы интерьера для уютного дома.</p></div>
        <div><h4>Каталог</h4><ul><li><a href="/catalog">Все товары</a></li><li><a href="/catalog">Новинки</a></li></ul></div>
        <div><h4>Покупателям</h4><ul><li><a href="#">Доставка</a></li><li><a href="#">Оплата</a></li></ul></div>
        <div><h4>Контакты</h4><ul><li>+7 (800) 000-00-00</li><li>info@furniture.ru</li></ul></div>
      </div>
      <div className="footer-bottom">© 2026 Мебель&Интерьер.</div>
    </div></footer>
  )
}
