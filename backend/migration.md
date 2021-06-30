build（jsでmigrationするので必須）
```
npm run build
```

migration作成
```
npx typeorm migration:generate -d src/migrations -n create-migrations
```

run
```
npm run build
npx typeorm migration:run
```