export default function UserProfile() {
    return <div>
        <label for="invest-profile">Profil d'investissement</label>
        <select id="invest-profile" class="form-select">
            <option value="balanced">Équilibré</option>
            <option value="beginner">Débutant</option>
            <option value="aggressive">Agressif</option>
        </select>
    </div>
}