import express from 'express';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

const plants = [
    { name: "Monstera deliciosa", type: "kúszónövény", description: "Trópusi kúszónövény nagy, lyukacsos levelekkel; világos, közvetett fényt és mérsékelt öntözést kedvel." },
    { name: "Ficus lyrata (Fiddle Leaf Fig)", type: "fa", description: "Egyenes növekedésű szobanövény nagy, hegedű alakú levelekkel; világos, szűrt fényt és egyenletes öntözést igényel. Gyakran kisebb lakásfa vagy díszfa szerepben." },
    { name: "Sansevieria trifasciata (Snake Plant)", type: "pozsgás", description: "Szívós, függőleges levelekkel; elviseli az alacsony fényt és a ritkább öntözést — kezdőknek kiváló. Pozsgás (sukulent) jellegű növény." },
    { name: "Epipremnum aureum (Pothos)", type: "kúszónövény", description: "Leomló kúszónövény szív alakú levelekkel; nagyon könnyen gondozható és jól alkalmazkodik gyenge fényhez." },
    { name: "Aloe vera", type: "pozsgás", description: "Pozsgás növény húsos, gyógyító levelekkel; világos fényt és ritkább öntözést igényel." },
    { name: "Lavandula (Lavender)", type: "virágzó évelő", description: "Illatos évelő keskeny levelekkel és lila virágokkal; teljes napfényt és jó vízelvezetésű talajt kedvel. Gyakran használják kertben és konténerben egyaránt." }
];

const ALLOWED_TYPES = new Set(['fa', 'kúszónövény', 'pozsgás', 'virágzó évelő', 'cserje', 'gyümölcsfa']);

app.get('/', (_req, res) => {
    res.json(plants);
});

// ADD THIS NEW ENDPOINT: Create a new plant
app.post('/plants', (req, res) => {
    const { name, type, description } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'A növény neve kötelező és nem lehet üres' });
    }

    // Check if plant with this name already exists
    const existingPlant = plants.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existingPlant) {
        return res.status(409).json({ error: 'Egy növény már létezik ezzel a névvel' });
    }

    // Validate type if provided
    if (type && !ALLOWED_TYPES.has(type)) {
        return res.status(400).json({ error: `Érvénytelen típus. Elfogadott típusok: ${Array.from(ALLOWED_TYPES).join(', ')}` });
    }

    // Create new plant
    const newPlant = {
        name: name.trim(),
        type: type || '',
        description: description || ''
    };

    plants.push(newPlant);
    res.status(201).json(newPlant);
});

app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Open on port: http://localhost:${PORT}/`);
});