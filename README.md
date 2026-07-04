# ekibaz.com

Сайт услуг по ремонту трансформаторов на SvelteKit, развёрнутый в Cloudflare Workers.

## Разработка

Установите зависимости и создайте локальный `.env` по примеру `.env.example`:

```bash
npm ci
cp .env.example .env
```

После заполнения Telegram-переменных:

```bash
npm run dev
npm run check
npm run build
```

## Обновление существующего Cloudflare Worker

Конфигурация закрепляет имя существующего Worker: `transformer-repair`. Не запускайте
`wrangler setup`, `wrangler init` и deploy с другим `--name`.

Авторизуйтесь интерактивно:

```bash
npx wrangler login
```

Для CI вместо login задайте `CLOUDFLARE_API_TOKEN` в окружении, не сохраняя его в репозитории.

Проверьте, что текущая учётная запись видит существующий Worker:

```bash
npm run cloudflare:verify
```

Подготовьте сборку и выполните dry-run без публикации:

```bash
npm run deploy:dry
```

Обновите существующий Worker:

```bash
npm run deploy
```

Deploy выполняется только после успешного `cloudflare:verify`. Флаг `--keep-vars` сохраняет
переменные существующего Worker, а Cloudflare-секреты при обычном deploy не удаляются.

Посмотреть историю развёртываний:

```bash
npm run cloudflare:list
```

Откатиться к конкретной версии:

```bash
npm run cloudflare:rollback -- <VERSION_ID>
```

Команда rollback запросит подтверждение перед переключением активной версии.
