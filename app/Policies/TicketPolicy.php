<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;

class TicketPolicy
{
    /**
     * Any authenticated user can view the list of their own tickets.
     * The controller filters by user_id, so this is just a gate for index.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Only the ticket owner can view a specific ticket.
     */
    public function view(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    /**
     * Any authenticated user can create tickets.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Only the ticket owner can update a ticket.
     */
    public function update(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    /**
     * Only the ticket owner can delete a ticket.
     */
    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }
}
