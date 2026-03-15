# Reinstall node_modules (Windows) - à lancer en dehors de Cursor/VS Code si EPERM
Set-Location $PSScriptRoot\..

if (Test-Path node_modules) {
    Write-Host "Suppression de node_modules..."
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    if (Test-Path node_modules) {
        Write-Host "ERREUR: Impossible de supprimer node_modules. Ferme Cursor, le serveur npm run dev, et relance ce script en tant qu'administrateur."
        exit 1
    }
}

Write-Host "Installation des dependances..."
npm install --legacy-peer-deps
Write-Host "Termine."
