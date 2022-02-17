:: Start datafetching service
start cmd.exe /k "set PORT=3001 && node ./datafetching/index.js" 

:: Start users service
start cmd.exe /k "set PORT=3002 && node ./users/index.js" 

:: Start exports service
start cmd.exe /k "set PORT=3003 && node ./export/index.js"