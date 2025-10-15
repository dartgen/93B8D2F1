import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
    res.json([
        { name: "Monstera deliciosa", description: "Trópusi kúszónövény nagy, lyukacsos levelekkel; világos, közvetett fényt és mérsékelt öntözést kedvel." },
        { name: "Ficus lyrata (Fiddle Leaf Fig)", description: "Egyenes növekedésű szobanövény nagy, hegedű alakú levelekkel; világos, szűrt fényt és egyenletes öntözést igényel." },
        { name: "Sansevieria trifasciata (Snake Plant)", description: "Szívós, függőleges levelekkel; elviseli az alacsony fényt és a ritkább öntözést — kezdőknek kiváló." },
        { name: "Epipremnum aureum (Pothos)", description: "Leomló kúszónövény szív alakú levelekkel; nagyon könnyen gondozható és jól alkalmazkodik gyenge fényhez." },
        { name: "Aloe vera", description: "Pozsgás növény húsos, gyógyító levelekkel; világos fényt és ritkább öntözést igényel." },
        { name: "Lavandula (Lavender)", description: "Illatos évelő keskeny levelekkel és lila virágokkal; teljes napfényt és jó vízelvezetésű talajt kedvel." }
    ]);
});

app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Open on port: http://localhost:${PORT}/`);
});