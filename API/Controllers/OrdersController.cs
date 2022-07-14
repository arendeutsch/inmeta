using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Orders;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            var order = await Mediator.Send(new Details.Query { Id = id });
            if (order == null) return NotFound();

            return order;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(Order order)
        {
            return Ok(await Mediator.Send(new Create.Command { Order = order }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditOrder(Guid id, Order order)
        {
            order.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Order = order }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}