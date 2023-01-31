welcome = Привет {$first_name}, этот бот пердоставляет возможность искать и скачивать книги с сайта flibusta. Также имеется возможность отправить книгу на прямую по почте Kindle на ваш девайс
        Напишите /help для вывода всех доступных команд

help = /book для поиска книг
       /author для поиска авторов
       /settings для вызова меню настроек

back = ⬅️ Назад
download = 📥 Скачать 
retry = 🔃 Ввести заново
search_error= <b> ⚠️ Запрос не должен начинаться с "/" !</b>

yes = Да
no = Нет

book_search = 🔍 Введите название книги для поиска 
book_search_success= <b>📚 Всего найдено { $count } книг</b>
book_search_fail = <b>😥 Ничего не найдено. Попробуйте ввести заново</b>
book_info = <b>📖 { $title } </b> 
         <b>Автор:</b><i> { $author } </i>
         <b>Жанры:</b> { $genres } 
         ⭐{ $rate }
         💾<b>Размер</b>: { $size }
         <b>Описание:</b>
         { $annotation }
book_sent_to_kindle = 📨 Отправить на Kindle 

email_request = ✉️ Введите почту Kindle
email_check = Подтвердите адрес электронной почты ⚠️
              Почта Kindle { $email }
email_sended = ✅ Книга отправлена 
email_save_req = 💌 Сохранить Kindle почту для следующих отправок?
email_change = 🔄 Изменить Kindle почту
email_changed = ✅ Почта была успешна изменена!
email_saved = ✅ Почта была успешна сохранена!
email_saved_short = ✅ Сохранено
email_add = 💌 Добавить Kindle почту
email_error = ⛔ Почта введена неверно, попробуйте еще раз

settings = 🕹️ Вы вошли в меню настроек, здесь вы можете изменить почту Kindle для отправки книг и отображение картинок в меню
show_book_image = Показывать обложку книги - { $value }
show_author_image = Показывать картинку автора - { $value }

author_search = 🔍 Введите ФИО автора для поиска
author_search_success = <b>🕵️ Всего найдено { $count } авторов</b>
author_search_fail = <b>😥 Ничего не найдено. Попробуйте ввести заново</b>
