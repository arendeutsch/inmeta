using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Orders.Any()) return;

            var orders = new List<Order>
            {
                new Order
                {
                    Name = "Aren",
                    Phone = "98035916",
                    Email = "arendeutsch@gmail.com",
                    Source = "Valnesfjord",
                    Destination = "Trondheim",
                    Service = "Moving",
                    Deadline = DateTime.Now.AddMonths(3),
                    Note = "Going back to school"
                },
                new Order
                {
                    Name = "Ylva",
                    Phone = "96533917",
                    Email = "ylva@gmail.com",
                    Source = "Valnesfjord",
                    Destination = "Mosjøen",
                    Service = "Moving",
                    Deadline = DateTime.Now.AddMonths(1),
                    Note = "Folkehøgskolen"
                },
                new Order
                {
                    Name = "Brynjar",
                    Phone = "96621917",
                    Email = "brynjar@gmail.com",
                    Source = "Sogndal",
                    Service = "Packing",
                    Deadline = DateTime.Now.AddMonths(-2),
                }
            };

            await context.Orders.AddRangeAsync(orders);
            await context.SaveChangesAsync();
        }
    }
}