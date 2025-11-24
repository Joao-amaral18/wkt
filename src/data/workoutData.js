export const WORKOUT_DATA = {
    "template": "IA_TOON_PROTOCOL",
    "version": "2.0",
    "athlete": {
        "name": "Joao Vitor Lima",
        "age": 24,
        "weight_kg": 98,
        "date": "18/09/2025",
        "team": "Team Ironwarg",
        "main_goal": "Priorizar desenvolvimento de PEITO e OMBROS + recomposição corporal"
    },

    "training_split": {
        "frequency": "4x/semana (Upper/Lower)",
        "weekly_structure": ["A1", "B1", "OFF", "A2", "B2", "OFF", "OFF"]
    },

    "workouts": {
        "A1_Upper1": [
            "Supino reto livre – 3×4-6 (1-2 RIR todas)",
            "Crucifixo máquina – 3×8-10 (falha técnica todas)",
            "Desenvolvimento máquina ou livre – 3×7-10 (falha técnica todas)",
            "Elevação lateral polia – 3×8-10 (falha total na última)",
            "Remada curvada – 2×6-8 (explosivo, upper back)",
            "Puxador frente triângulo – 2×7-10 (falha técnica)",
            "Tríceps barrinha polia – 3×8-10 (falha total na última)",
            "Rosca direta polia – 3×8-10 (falha total na última)"
        ],

        "B1_Lower1": [
            "Agachamento livre – 1×4-6 (1-2 RIR)",
            "Leg press – 2×5-9 (falha técnica)",
            "Cadeira extensora – 2×5-9 (falha total; unilateral se necessário)",
            "Mesa flexora – 2×8-10 (falha técnica)"
        ],

        "A2_Upper2": [
            "Supino inclinado smith – 3×5-9 (falha técnica 1ª, falha total 2ª e 3ª)",
            "Crucifixo máquina – 3×5-9 (falha técnica 1ª, falha total 2ª e 3ª)",
            "Desenvolvimento smith – 3×5-9 (falha técnica 1ª, falha total 2ª e 3ª)",
            "Elevação lateral polia ou halter – 3×8-10 (falha total na última)",
            "Remada apoio de peito (upper back) – 2×5-9 (falha técnica 1ª, total 2ª)",
            "Puxador frente triângulo – 2×5-9 (falha técnica 1ª, total 2ª)",
            "Tríceps francês polia – 2×8-10 (falha total na última)",
            "Rosca bayesian – 2×8-10 (falha total na última)"
        ],

        "B2_Lower2": [
            "Levantamento terra – 1×2-4 (80-95% 1RM – NUNCA falhar)",
            "RDL – 2×6-8 (1-2 RIR)",
            "Cadeira flexora – 2×5-9 (falha total)",
            "Cadeira extensora – 2×5-9 (falha técnica)",
            "Cadeira adutora – 2×8-10 (falha total na última)",
            "Cadeira abdutora – 2×8-10 (falha total na última)"
        ]
    },

    "extras": {
        "abdomen_panturrilha": "4-6 séries de cada por semana (pode colocar em lower ou OFF)",
        "cardio": "4x/semana → 45 min LISS esteira (vel. 5-6 km/h + inclinação 3-4)",
        "cardio_refeicao_livre": "+10 min no dia da ref livre + dia seguinte"
    },

    "nutrition": {
        "daily_kcal": 2300,
        "macros": { "prot": 170, "carb": 253, "fat": 45 },
        "meals": [
            "Ref1 → 4 ovos inteiros mexidos + 2 fat pão forma + 20g muçarela + 100g abacaxi",
            "Ref2 → 180g arroz branco + 150g feijão + 150g frango grelhado + 100g abacaxi + salada",
            "Ref3 → 160g iogurte natural desnatado + 40g whey + 30g aveia + 100g maçã",
            "Ref4 → igual Ref2"
        ],
        "water": "Mínimo 4 L/dia",
        "cheat_meal": "1x/semana até ~1500 kcal → retirar 2 refeições do dia (preferência janta) + compensar cardio e água",
        "cheat_rule": "Só liberada com 100% de adesão ao protocolo"
    },

    "progression_rules": {
        "load_progression": "Anotar TODAS as cargas e reps",
        "never_fail": ["Agachamento livre", "Levantamento terra"],
        "rir_guide": "Séries de 4-6 → cargas mais pesadas | 8-10 → cargas mais leves que 5-9",
        "warmup": "2-4 sets leves antes de cada composto"
    },

    "design": {
        "background": "preto com detalhes vermelho escuro Ironwarg",
        "logo_position": "top_center",
        "athlete_photo": "esquerda superior",
        "font_primary": "Bebas Neue bold (branco e vermelho)",
        "highlight_color": "#B81D24",
        "sections_divider": "linha vermelha com logo pequeno no meio"
    }
};
