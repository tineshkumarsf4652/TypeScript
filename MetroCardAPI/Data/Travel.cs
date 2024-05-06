namespace MetroCardAPI.Data;

public class Travel
{
    public int TravelID{get; set;}
    public int CardID{get; set;}
    public string FromLocation{get; set;}
    public string ToLocation{get; set;}
    public DateTime TravelDate{get; set;}
    public double TravelCost{get; set;}
}