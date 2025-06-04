def personal_risk_score(user):
    """
    Calculate the personal risk score based on the user's health and activity information.
    The input `user` should be a dict with keys matching the form fields.
    Returns an integer risk score (0-15).
    """
    risk_score = 0
    if user.get('ageGroup') in ['0-4', '65+']:
        risk_score += 2
    elif user.get('ageGroup') == '5-17':
        risk_score += 1
    if user.get('hasLungCondition') == 'yes':
        risk_score += 3
    if user.get('isPregnant') == 'yes':
        risk_score += 2
    if user.get('hasHeartCondition') == 'yes':
        risk_score += 2
    if user.get('outdoorsMoreThanTwoHours') == 'yes':
        risk_score += 1
    if user.get('activityIntensity') == 'hard':
        risk_score += 2
    elif user.get('activityIntensity') == 'moderate':
        risk_score += 1
    if user.get('workSetting') == 'outdoor':
        risk_score += 2
    elif user.get('workSetting') == 'indoor-windows':
        risk_score += 1
    if user.get('smokesOrVapes') == 'yes':
        risk_score += 2
    if user.get('hasAirPurifier') == 'yes':
        risk_score -= 1
    # Clamp to [0, 15]
    risk_score = max(0, min(risk_score, 15))
    return risk_score
