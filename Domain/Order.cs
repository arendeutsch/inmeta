using System;

namespace Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public string Service { get; set; }
        public DateTime Deadline { get; set; }
        public string Note { get; set; }
        public DateTime Deleted { get; set; }
    }
}