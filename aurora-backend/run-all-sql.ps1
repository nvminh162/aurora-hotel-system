# =========================
# Settings
# =========================

$CONTAINER = "rag_postgres"
$DB = "aurora_hotel"
$USER = "admin"

# Absolute path to backend folder
$BASE = "D:\HK7\BTL\aurora-hotel-system\aurora-backend\src\main\resources\db"

# SQL files to execute (order matters)
$FILES = @(
    "$BASE\init-auto\init-roles-permissions.sql",
    "$BASE\init-auto\init-db-pg-admin.sql",
    "$BASE\init-auto\fix-email-verified.sql",
    "$BASE\fix-db\fix-reset-admin-password.sql",
    "$BASE\fix-db\fix-token-tables.sql"
)

Write-Host "=== Running SQL files for Aurora Hotel DB ==="

foreach ($file in $FILES) {
    if (Test-Path $file) {
        Write-Host "`n--> Running: $file"

        # PowerShell way to pipe file contents into docker exec
        Get-Content $file | docker exec -i $CONTAINER psql -U $USER -d $DB
    } else {
        Write-Host "`n[WARNING] File not found: $file"
    }
}

Write-Host "`n=== COMPLETED ==="
