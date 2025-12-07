def calculate_rating(data):
    base = 100
    penalty = (data["delay"] / 20) + (data["incident_count"] * 5)
    score = max(0, base - penalty)
    return round(score)
