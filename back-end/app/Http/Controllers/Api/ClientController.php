<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * @var Client
     */
    private $client;

    public function __construct(Clients $client)
    {
        $this->client = $client;
    }

    public function index()
    {
        $clients = $this->client->paginate(4);

        return response()->json($clients);
    }

    public function show($id)
    {
        $client = $this->client->find($id);

        return response()->json($client);
    }

    public function save(Request $request)
    {
        $data = $request->all();
        $client = $this->client->create($data);

        return response()->json($client);
    }

    public function update(Request $request)
    {
        $data = $request->all();

        $client = $this->client->find($data['id']);
        $client->update($data);

        return response()->json($client);
    }

    public function delete($id)
    {
        $client = $this->client->find($id);
        $client->delete();

        return response()->json(['data' => 'Produto foi removido com sucesso!']);
    }
}
