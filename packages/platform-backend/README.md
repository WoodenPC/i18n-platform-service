# platform-backend

# Требования к проекту

 При регистрации создается пользователь, у которого будет команда, пользователь для этой команды будет создателем
 Пользователь может приглашать в команду других пользователей
 В команде может быть несколько ролей:
    OWNER - создатель команды, самый главный, может удалить команду, ownerа нельзя удалить из команды, обладает всем набором прав из других ролей
    ADMIN - может пришлашать пользователей, удалять пользователей из команды (кроме OWNER), может повышать пользователей до админа, заниматься настройкой команды
    MEMBER - просто чел из команды, никаких прав на удаление / добавление пользователей нету, просто работает с проектами

Настройки команды:
    Создание групп внутри команды:
        Внутри команды админы и овнеры могут создавать группы пользователей. Для группы можно добавить/удалить членов группы, настроить пермишенны, и добавить удалить проекты. Пермишенны при включенной галке administator rules позволяют прикреплять файлы, настраивать ключи, настраивать список языков (если включена галочка administator rules) данная штука работает только для членов команды (MEMBER), для которых можно делать переводы Reference languages, Contributable languages (по умолчанию ALL). А также в группу можно добавлять/удалять проекты.
    TODO

Настройки пользователя:
    изменения пароля
    генерация api tokena , разрешения read, write для проектов

Проект
    Проект состоит из ключей, к которым можно добавлять переводы на различных языках. Языки добавляются к проекту к каждому по отдельности. У ключей внутри проектов могут быть тэги, по которым можно будет потом фильтровать, фотографии, персонализированные ссылки (планируется все это сделать). 2 вида настроек у ключа General и Advanced. В General - Key, base language value, platforms, description, tag.


