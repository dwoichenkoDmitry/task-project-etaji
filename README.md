# Выполненные мною пункты ТЗ: 

 1 - Приложение позволяет добавлять/удалять/редактировать задачи;\
 2 - У каждой задачи должны быть следующие параметры: заголовок, флаг выполнена или нет, дата начала, дата конца и описание;\
 3 - Даты должны выводиться в формате “5 фев 2022 г.”;\
 4 - Задачи отображаются на главной странице в порядке их добавления в виде списка с пагинацией. По достижению конца страницы добавляются новые данные, а по достижению конца списка задач отображается надпись “Конец списка”. На одной странице отображаются 15 задач;\
 5 - Задачи на главной странице можно фильтровать по всем параметрам, кроме описания. После изменения параметров фильтрации пагинация сбрасывается, т.е. отображается только первая страница;\
 6 - Добавление и редактирование происходит на отдельной странице.\
 7 - Удаление задачи происходит на главном экране после подтверждения, вызывается алерт “Вы действительно хотите удалить задачу?”;\
 8 - Флаг “Выполнена” у задачи можно изменить только на главной странице;\
 9 - Все данные о задачах сохраняются в LocalStorage и загружаются оттуда при открытии приложения;\
 10 - Все страницы должны быть сверстаны на flex. Верстка должна быть адаптирована только под мобильные устройства;\
 11 - (*) Удаленные задачи должны отображаться на отдельной странице / в отдельном блоке “Корзина”. Список удаленных задач можно очистить;\
 12 - (*) сымитировать задержку синхронизации в 500мс; (воспользовался redux-saga, но выполнил лишь задержку загрузки и выгрузки данных)\
 13 - (*) Список задач должен быть виртуализированным;\

# Частично выполненные:

(*) Верстка должна быть адаптирована под десктопные устройства. 

# Не понят принцип заданий:

 ー (*) На всех страницах должна отображаться информация о состоянии синхронизации с LocalStorage;\
 ー (*) Данные должны синхронизироваться с LocalStorage не чаще чем раз в 300мс;\
 ー (*) В случае ошибки синхронизации (происходит в 50% случаях, необходимо сымитировать) необходимо уведомить об этом пользователя. Пользователь должен иметь возможность повторить синхронизацию при сбое;\


# Использованные технологии из ТЗ:

 ー React\
 ー React Native Web\
 ー Redux\
 ー (*) Redux-saga (упростит выполнение доп. задач)\
 ー (*) TypeScript\
 ー (*) moment\
 ー (*) React Router (С Navigation возникли проблемы с зависимостями в веб версией фреймворка)\


# Принцип работы работы с данными:

Компоненты посылают запрос в Redux, где изменяется состояние объектов. Объекты в redux ("posts" и "bag") являются массивами объектов.\
При изменении данных, так же, посылается асинхронный запрос в Redux-saga, для синхронизации данных с localStorage, с имитированной задержкой в 500мс. 
В localStorage массивы объектов сохраняются целиком, по ключам "posts" и "bag".\
Даты форматируются посредством библиотеки momentJs.\
Для реализациии фильтрации локализированные на русский даты являются некорректными, поэтому сохраняю даты в стандартном формате, в свойствах "defaultStartDate" и "defaultFinishDate".\
Задачи к отображению списка полностью решил средствами компонента FlatList.\
Так как у меня нет проектов на Native, а на задание было дано лишь 4 дня, я воспользовался библиотекой styled-components, преобразующей стандартные css стили в воспринимаемые мобильными устройствами.\
Так же, возникли проблемы с выводом мобильного алерта в веб версии, поэтому я написал собственный алерт, подписывающийся на событие клика вне тела, посредством useState, вызывая скрытие компонента.\
Возникли проблемы с телефонным компонентом выбора даты, отчего я использовал стандартный input date.\


# С чем я познакомился, по ходу выполнения

Ранее, у меня не было опыта разработки React Native, разобрылся в принципах работы с нативным реактом.\
Мне приглянулся компонент FlatList, за его встроенные методы оптимизации.\
Подробнее разобрался с Redux, впервые познакомился с асинхронным изменением состояния в Redux.\
Всё, что касается стандартного React, насколько я могу судить, я знал до начала выполнения.

